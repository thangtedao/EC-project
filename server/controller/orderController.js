import { PRODUCT_STATUS } from "../utils/constants.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import day from "dayjs";
import { createPayPalOrder } from "../utils/paypal.js";
import { sendMail } from "../utils/email.js";
import moment from "moment";
import querystring from "qs";
import crypto from "crypto";

export const paypalPayment = async (req, res) => {
  try {
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createPayPalOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

export const paypalCaptureOrder = async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await createPayPalOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { cart, user, coupon } = req.body;

    const products = cart.products.map((product) => {
      return {
        product: product.product._id,
        price: product.product.salePrice,
        count: product.count,
      };
    });

    let totalPrice =
      cart?.products.reduce(
        (accumulator, item) =>
          accumulator + item.product.salePrice * item.count,
        0
      ) || 0;

    let newOrder;
    if (coupon) {
      totalPrice = (totalPrice - (totalPrice * coupon.discount) / 100).toFixed(
        0
      );
      newOrder = new Order({
        orderBy: user._id,
        products: products,
        totalPrice: totalPrice,
        coupon: {
          couponId: coupon.id,
          name: coupon.name,
          discount: coupon.discount,
        },
      });
    } else {
      newOrder = new Order({
        orderBy: user._id,
        products: products,
        totalPrice: totalPrice,
      });
    }

    const savedOrder = await newOrder.save();
    await Cart.findOneAndRemove({ user: user._id });

    const order = await Order.findById(savedOrder._id).populate({
      path: "products.product",
      select: ["_id", "name", "salePrice"],
    });

    order.products.map(async (item) => {
      const product = await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: { sold: 1, stockQuantity: -1 },
        },
        { new: true }
      );

      if (product && product.stockQuantity <= 0) {
        await Product.findByIdAndUpdate(product._id, {
          $set: { status: PRODUCT_STATUS.OUT_OF_STOCK },
        });
      }
    });

    sendMail(user, order);
    res.status(200).json({ msg: "Payment Successful" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrders = async (req, res) => {
  try {
    let query;

    if (req.query.userId) {
      const id = req.query.userId;
      query = Order.find({ orderBy: id });

      query.populate([
        {
          path: "orderBy",
          select: ["fullName"],
        },
        {
          path: "products.product",
          select: [
            "name",
            "price",
            "salePrice",
            "description",
            "category",
            "images",
          ],
        },
      ]);
    } else {
      const { status } = req.query;
      if (!status || status === "all") {
        query = Order.find();
      } else {
        query = Order.find({ orderStatus: status });
      }
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      if (req.query.date && req.query.date === "old") {
        query = query.sort("createdAt");
      } else {
        query = query.sort("-createdAt");
      }
    }

    query.populate({
      path: "orderBy",
      select: ["fullName"],
    });

    if (req.query.page) {
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      const orderCount = await Order.countDocuments();
      if (skip >= orderCount)
        throw new NotFoundError(`This page does not exists`);
    }

    const orders = await query;
    res.status(200).json({ orders });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId }).populate([
      {
        path: "products.product",
        select: ["name", "images"],
      },
      {
        path: "orderBy",
        select: ["fullName", "email", "phone", "avatar", "address"],
      },
    ]);
    res.status(200).json({ order });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
    if (!updatedOrder) throw new NotFoundError(`this order does not exist`);
    res.status(200).json({ updatedOrder });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const showStats = async (req, res) => {
  /* SHOW STATS BY DATE */
  let startDate = new Date(req.query.start);
  let endDate = new Date(req.query.end);

  if (!req.query.start && !req.query.end) {
    endDate = new Date();
    startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 10);
  }

  /* CALCULATE THE STATS */
  const result = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: {
          orderId: "$_id",
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        totalRevenue: { $first: "$totalPrice" },
        totalProduct: { $sum: "$products.count" },
      },
    },
  ]);

  let totalCount = result.length || 0;
  let totalRevenue = 0;
  let totalProduct = 0;
  if (result.length > 0) {
    result.map((item) => {
      totalRevenue += item.totalRevenue;
      totalProduct += item.totalProduct;
    });
  }

  /* PRODUCT MOST SOLD */
  const productMostSold = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products.product",
        totalQuantity: { $sum: "$products.count" },
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        _id: "$product._id",
        name: "$product.name",
        slug: "$product.slug",
        status: "$product.status",
        sold: "$product.sold",
        stockQuantity: "$product.stockQuantity",
        price: "$product.price",
        salePrice: "$product.salePrice",
        images: "$product.images",
        totalQuantity: 1,
      },
    },
  ]);

  /* FORMAT DATA TO SHOW IN GRAPH */
  let monthlyApplications = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { month },
        totalRevenue,
      } = item;
      const date = day()
        .month(month - 1)
        .format("MMMM");
      return { date, totalRevenue };
    })
    .reverse();

  res.json({
    monthlyApplications,
    totalRevenue,
    totalCount,
    totalProduct,
    productMostSold,
  });
};

//vn-payment:
export const createPaymentUrl = (req, res, next) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // let config = require('config');
  // let tmnCode = config.get('vnp_TmnCode');
  // let secretKey = config.get('vnp_HashSecret');
  // let vnpUrl = config.get('vnp_Url');
  // let returnUrl = config.get('vnp_ReturnUrl');
  // let orderId = moment(date).format('DDHHmmss');

  let tmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;
  let vnpUrl = process.env.VNP_URL;
  let returnUrl = process.env.VNP_RETURNURL;
  let orderId = moment(date).format("DDHHmmss");

  let amount = req.body.amount;
  let bankCode = req.body.bankCode;

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  // let querystring = require('qs');
  let signData = querystring.stringify(vnp_Params, { encode: false });
  // let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  // console.log("clgt");
  res.json({ redirectUrl: vnpUrl });
};

export const vnpayReturn = (req, res, next) => {
  console.log("calling vnpay return");
  let vnp_Params = req.query;
  console.log("vnp params: ", vnp_Params);
  console.log("vnp params: ", vnp_Params["vnp_SecureHash"]);
  console.log("vnp params: ", vnp_Params["vnp_Version"]);

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let tmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;

  // let querystring = require('qs');
  let signData = querystring.stringify(vnp_Params, { encode: false });
  // let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  console.log("secureHash: ", secureHash);
  console.log("signed: ", signed);

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    console.log("00");
    res.json({ code: "00" });
  } else {
    console.log("97");
    res.json({ code: "97" });
  }
};

export const vnpayIpn = (req, res, next) => {
  let secureHash = vnp_Params["vnp_SecureHash"];

  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  // let config = require('config');
  // let secretKey = config.get('vnp_HashSecret');
  let secretKey = process.env.VNP_HASHSECRET;

  // let querystring = require('qs');
  let signData = querystring.stringify(vnp_Params, { encode: false });
  // let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
  //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
  //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

  let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
  let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
  if (secureHash === signed) {
    //kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus == "0") {
          //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
          if (rspCode == "00") {
            //thanh cong
            //paymentStatus = '1'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
            res.status(200).json({ RspCode: "00", Message: "Success" });
          } else {
            //that bai
            //paymentStatus = '2'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
            res.status(200).json({ RspCode: "00", Message: "Success" });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
};
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
