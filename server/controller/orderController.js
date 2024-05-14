import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { PRODUCT_STATUS } from "../utils/constants.js";
import { createPayPalOrder } from "../utils/paypal.js";
import { sendMail } from "../utils/email.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";
import axios from "axios";
import moment from "moment";
import querystring from "qs";
import crypto from "crypto";
import Coupon from "../models/Coupon.js";

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
    const { cartItem, coupon, address, orderId, paymentMethod } = req.body;
    const { userId } = req.user;

    if (!cartItem)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Lỗi khi tạo đơn hàng" });

    let discountAmount = 0;
    let productIds = [];
    let productQty = [];

    const orderItem = cartItem.map((item) => {
      let variantPrice = item.variant ? item.variant.price : 0;
      let salePrice = item.product.salePrice * item.quantity + variantPrice;

      if (coupon)
        if (coupon.discountType === "percentage") {
          discountAmount += (salePrice * coupon.discountValue) / 100;

          salePrice = (
            salePrice -
            (salePrice * coupon.discountValue) / 100
          ).toFixed(0);
        } else if (coupon.discountType === "fixed") {
          discountAmount += coupon.discountValue;
          salePrice = salePrice - coupon.discountValue;
        }

      productIds.push(item.product._id.toString());
      productQty.push(item.quantity);

      return {
        product: {
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.images[0],
        },
        variant: item.variant && item.variant._id,
        quantity: item.quantity,
        priceAtOrder: item.product.salePrice + variantPrice,
        subtotal: item.product.salePrice * item.quantity,
      };
    });

    const totalAmount =
      orderItem.reduce(
        (acc, item) => acc + item.priceAtOrder * item.quantity,
        0
      ) || 0;

    if (coupon && coupon.maxDiscount && discountAmount > coupon.maxDiscount)
      discountAmount = coupon.maxDiscount;

    const user = await User.findById(userId);

    const newOrder = new Order({
      user: user._id,
      orderItem: orderItem,
      couponCode: coupon?.code,
      discountAmount: coupon ? discountAmount.toFixed(0) : 0,
      shippingAddress:
        address.city +
        ", " +
        address.district +
        ", " +
        address.ward +
        ", " +
        address.home,
      totalAmount: totalAmount - discountAmount.toFixed(0),
      paymentMethod: paymentMethod,
      vnpTxnRef: orderId,
      vnpTransactionDate: orderId.slice(-14),
    });

    const order = await newOrder.save();

    // decrease stockQty
    if (productIds.length > 0 && productQty.length > 0) {
      const products = await Product.find({ _id: { $in: productIds } });
      for (const product of products) {
        const index = productIds.indexOf(product._id.toString());
        const quantity = productQty[index];

        if (product.stockQuantity - quantity <= 0) {
          product.stockQuantity = 0;
          product.status = PRODUCT_STATUS.OUT_OF_STOCK;
        } else {
          product.stockQuantity -= quantity;
        }
        await product.save();
      }
    }

    // descrease coupon's number of usage
    if (coupon) {
      await Coupon.findByIdAndUpdate(coupon._id, {
        $inc: { numberOfUses: -1 },
      });
    }
    await Cart.findOneAndUpdate({ user: userId }, { $set: { cartItem: [] } });

    if (order && user) sendMail(user, order);
    res.status(StatusCodes.OK).json({ msg: "Payment Successful" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "populate",
      "admin",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq|ne)\b/g,
      (match) => `$${match}`
    );

    let query;
    if (req.user.role === "admin" && req.query.admin) {
      query = Order.find(JSON.parse(queryStr));
    } else {
      query = Order.find({ user: req.user.userId });
      if (queryStr !== "{}") {
        query.find(JSON.parse(queryStr));
      }
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    if (req.query.populate) {
      const item = req.query.populate.split(",").join(" ");
      query = query.populate(item);
    }

    query.populate({ path: "user", select: ["_id", "fullName"] });

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
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user");
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (req.body.status && req.body.status === "Cancelled") {
      const productIds = updatedOrder.orderItem.map((item) =>
        item.product.id.toString()
      );
      const productQty = updatedOrder.orderItem.map((item) => item.quantity);

      // increase stockQty
      const products = await Product.find({ _id: { $in: productIds } });

      for (const product of products) {
        const index = productIds.indexOf(product._id.toString());
        const quantity = productQty[index];

        if (product.stockQuantity <= 0) {
          product.stockQuantity += quantity;
          product.status = PRODUCT_STATUS.AVAILABLE;
        } else {
          product.stockQuantity += quantity;
        }
        await product.save();
      }
    }

    if (req.body.status && req.body.status === "Delivered") {
      // Update rank user
      const orders = await Order.find({
        user: updatedOrder.user,
        status: "Delivered",
      });
      let totalSpent = 0;
      orders.forEach((order) => {
        totalSpent += order.totalAmount;
      });
      let rankToUpdate = "member";

      if (totalSpent >= 100000000) {
        rankToUpdate = "diamond";
      } else if (totalSpent >= 50000000) {
        rankToUpdate = "gold";
      } else if (totalSpent >= 25000000) {
        rankToUpdate = "silver";
      }

      await User.findByIdAndUpdate(updatedOrder.user, {
        $set: { rank: rankToUpdate },
      });
    }

    if (!updatedOrder) throw new NotFoundError(`This order does not exist`);
    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const createGhnOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedOrder = await Order.findById(id).populate("user");

    if (!updatedOrder) throw new NotFoundError(`This order does not exist`);

    let items = [];
    updatedOrder.orderItem.forEach((item) => {
      let i = {};
      i.name = item.product.name;
      i.quantity = parseInt(item.quantity);
      i.price = item.priceAtOrder;

      items.push(i);
    });

    const orderGhn = {
      payment_type_id: 1,
      note: "",
      required_note: "CHOXEMHANGKHONGTHU",
      return_phone: "",
      return_address: "",
      return_district_id: null,
      return_ward_code: "",
      client_order_code: "",
      from_name: "",
      from_phone: "",
      from_address: "",
      from_ward_name: "",
      from_district_name: "",
      from_province_name: "",
      to_name: updatedOrder.user.fullName || "Thanh Vy",
      to_phone: "0909999999",
      to_address:
        updatedOrder.user.address.home +
          updatedOrder.user.address.ward +
          updatedOrder.user.address.district +
          updatedOrder.user.address.city ||
        "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
      to_ward_name: updatedOrder.user.address.ward,
      to_district_name: updatedOrder.user.address.district,
      to_province_name: updatedOrder.user.address.city,
      cod_amount: 0,
      content: "",
      weight: 200,
      length: 1,
      width: 19,
      height: 10,
      cod_failed_amount: 2000,
      pick_station_id: null,
      deliver_station_id: null,
      insurance_value: 0,
      service_id: 0,
      service_type_id: 2,
      coupon: null,
      pickup_time: 1692840132,
      pick_shift: null,
      items: items,
    };

    const { data } = await axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
      orderGhn,
      {
        headers: {
          "Content-Type": "application/json",
          shop_id: process.env.SHOP_ID,
          token: process.env.TOKEN_GHN,
        },
      }
    );

    console.log(data);

    if (!data.data)
      return res.status(StatusCodes.CONFLICT).json({ msg: data.message });

    updatedOrder.orderCode = data.data.order_code;
    updatedOrder.status = "Processing";
    updatedOrder.isSeen = true;
    updatedOrder = await updatedOrder.save();

    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const printGhnOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (order && order.orderCode) {
      const { data } = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token",
        {
          headers: {
            Token: process.env.TOKEN_GHN,
          },
          params: {
            order_codes: order.orderCode,
          },
        }
      );

      const token = data.data.token;

      const result = await axios.get(
        `https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${token}`,
        {
          headers: {
            Token: process.env.TOKEN_GHN,
          },
        }
      );
      res.send(result.config.url);
    } else throw new NotFoundError(`This order does not exist`);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCancel } = req.body;
    const cancelOrder = await Order.findByIdAndUpdate(
      id,
      { isCancel: isCancel },
      { new: true }
    );
    if (!cancelOrder) throw new NotFoundError(`This order does not exist`);
    res.status(StatusCodes.OK).json(cancelOrder);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const showStats = async (req, res) => {
  try {
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    endDate.setDate(endDate.getDate() + 1);

    /* CALCULATE THE STATS */

    // ORDER
    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$userData", 0] },
        },
      },
      {
        $addFields: {
          totalProduct: { $sum: "$orderItem.quantity" },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          orders: {
            $addToSet: {
              _id: "$_id",
              user: "$user",
              totalAmount: "$totalAmount",
              status: "$status",
              createdAt: "$createdAt",
              totalProduct: "$totalProduct",
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
          "_id.day": -1,
        },
      },
    ]);

    let totalOrder = 0;
    let totalRevenue = 0;
    let totalProduct = 0;
    if (orders.length > 0) {
      orders.forEach((item) => {
        item.orders.forEach((order) => {
          totalRevenue += order.totalAmount;
          totalProduct += order.totalProduct;
          totalOrder++;
        });
      });
    }

    // PRODUCT
    const products = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $match: {
          status: {
            $eq: "Delivered",
          },
        },
      },
      {
        $unwind: "$orderItem",
      },
      {
        $group: {
          _id: "$orderItem.product.id",
          name: { $first: "$orderItem.product.name" },
          price: { $first: "$orderItem.product.price" },
          image: { $first: "$orderItem.product.image" },
          totalRevenue: {
            $sum: "$orderItem.subtotal",
          },
          // totalRevenue: {
          //   $sum: {
          //     $multiply: ["$orderItem.priceAtOrder", "$orderItem.quantity"],
          //   },
          // },
          totalSold: { $sum: "$orderItem.quantity" },
        },
      },
    ]);

    // USER
    const users = await Order.aggregate([
      {
        $match: {
          status: {
            $eq: "Delivered",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$userData", 0] },
        },
      },
      {
        $group: {
          _id: "$user._id",
          avatar: { $first: "$user.avatar" },
          fullName: { $first: "$user.fullName" },
          email: { $first: "$user.email" },
          phone: { $first: "$user.phone" },
          address: { $first: "$user.address" },
          rank: { $first: "$user.rank" },
          totalSpent: { $sum: "$totalAmount" },
        },
      },
      { $limit: 10 },
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
        $match: {
          status: {
            $eq: "Delivered",
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      { $limit: 12 },
    ]);

    let dailyApplications = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $match: {
          status: {
            $eq: "Delivered",
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 },
      },
      { $limit: 20 },
    ]);

    /* NUMBER OF ORDER PER MONTH AND DAY */
    let numOfOrdersPerMonth = await Order.aggregate([
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
          total: { $sum: 1 },
          cancel: {
            $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
          },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      { $limit: 12 },
    ]);

    let numOfOrdersPerDay = await Order.aggregate([
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
            day: { $dayOfMonth: "$createdAt" },
          },
          total: { $sum: 1 },
          cancel: {
            $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
          },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 },
      },
      { $limit: 10 },
    ]);

    /* NUMBER OF USERS */
    const totalUser = await User.countDocuments();

    /* COMPARE REVENUE WITH LAST MONTH */
    let compareRevenue = await Order.aggregate([
      {
        $match: {
          status: {
            $eq: "Delivered",
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      { $limit: 2 },
    ]);

    res.json({
      monthlyApplications,
      dailyApplications,
      numOfOrdersPerMonth,
      numOfOrdersPerDay,
      compareRevenue,
      totalOrder,
      totalProduct,
      totalUser,
      orders,
      products,
      users,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const showStats2 = async (req, res) => {
  try {
    /* CALCULATE THE STATS */
    const products = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $unwind: "$orderItem",
      },
      {
        $group: {
          _id: "$orderItem.product.id",
          totalRevenue: {
            $sum: "$orderItem.subtotal",
          },
          totalSold: { $sum: "$orderItem.quantity" },
        },
      },
    ]);

    res.json({ products });
  } catch (error) {
    console.log(error);
    return error;
  }
};

//vn-payment:
export const createPaymentUrl = (req, res, next) => {
  try {
    process.env.TZ = "Asia/Ho_Chi_Minh";

    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let tmnCode = process.env.VNP_TMNCODE;
    let secretKey = process.env.VNP_HASHSECRET;
    let vnpUrl = process.env.VNP_URL;
    let returnUrl = process.env.VNP_RETURNURL;
    let orderId = moment(date).format("DDHHmmss") + createDate;

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

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    res.status(StatusCodes.OK).json({ redirectUrl: vnpUrl });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const vnpayReturn = (req, res, next) => {
  try {
    let vnp_Params = req.query;
    const orderId = req.query.vnp_TxnRef;
    let transactionTime = vnp_Params["vnp_CreateDate"];
    let vnp_TransactionStatus = vnp_Params["vnp_TransactionStatus"];
    if (vnp_TransactionStatus === "02")
      return res.status(StatusCodes.OK).json({ code: "02" });
    else if (vnp_TransactionStatus === "01")
      return res.status(StatusCodes.OK).json({ code: "01" });

    let secureHash = vnp_Params.vnp_SecureHash;
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = process.env.VNP_TMNCODE;
    let secretKey = process.env.VNP_HASHSECRET;

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      res
        .status(StatusCodes.OK)
        .json({ code: "00", orderId: orderId, paymentMethod: "vnpay" });
    } else {
      res.status(StatusCodes.OK).json({ code: "97" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
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
            res
              .status(StatusCodes.OK)
              .json({ RspCode: "00", Message: "Success" });
          } else {
            //that bai
            //paymentStatus = '2'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
            res
              .status(StatusCodes.OK)
              .json({ RspCode: "00", Message: "Success" });
          }
        } else {
          res.status(StatusCodes.OK).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res
          .status(StatusCodes.OK)
          .json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res
        .status(StatusCodes.OK)
        .json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res
      .status(StatusCodes.OK)
      .json({ RspCode: "97", Message: "Checksum failed" });
  }
};

export const getBestSalerProduct = async (req, res) => {
  try {
    const productSoldStats = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $unwind: "$orderItem",
      },
      {
        $group: {
          _id: "$orderItem.product.id",
          totalSold: { $sum: "$orderItem.quantity" },
        },
      },
      {
        $sort: { totalSold: -1 }, // Sort by totalSold descending
      },
      {
        $limit: 10, // Limit to 10 products
      },
    ]);
    // Get the IDs of the top 5 products
    const topProductIds = productSoldStats.map((product) => product._id);

    // Retrieve full product details of the top 5 products
    const products = await Product.find({ _id: { $in: topProductIds } });
    res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const refundOrder = async (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  let date = new Date();

  // let config = require('config');
  // let crypto = require("crypto");

  let vnp_TmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;
  let vnp_Api = process.env.VNP_API;

  let vnp_TxnRef = req.body.vnpTxnRef;
  let vnp_TransactionDate = req.body.transactionDate;
  let vnp_Amount = req.body.tototalAmount * 100;
  let vnp_TransactionType = req.body.transactionType;
  let vnp_CreateBy = req.body.CreateBy;

  let currCode = "VND";

  let vnp_RequestId = moment(date).format("HHmmss");
  let vnp_Version = "2.1.0";
  let vnp_Command = "refund";
  let vnp_OrderInfo = "Hoan tien GD ma:" + vnp_TxnRef;

  let vnp_IpAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

  let vnp_TransactionNo = "0";

  let data =
    vnp_RequestId +
    "|" +
    vnp_Version +
    "|" +
    vnp_Command +
    "|" +
    vnp_TmnCode +
    "|" +
    vnp_TransactionType +
    "|" +
    vnp_TxnRef +
    "|" +
    vnp_Amount +
    "|" +
    vnp_TransactionNo +
    "|" +
    vnp_TransactionDate +
    "|" +
    vnp_CreateBy +
    "|" +
    vnp_CreateDate +
    "|" +
    vnp_IpAddr +
    "|" +
    vnp_OrderInfo;
  let hmac = crypto.createHmac("sha512", secretKey);
  let vnp_SecureHash = hmac.update(new Buffer(data, "utf-8")).digest("hex");

  let dataObj = {
    vnp_RequestId: vnp_RequestId,
    vnp_Version: vnp_Version,
    vnp_Command: vnp_Command,
    vnp_TmnCode: vnp_TmnCode,
    vnp_TransactionType: vnp_TransactionType,
    vnp_TxnRef: vnp_TxnRef,
    vnp_Amount: vnp_Amount,
    vnp_TransactionNo: vnp_TransactionNo,
    vnp_CreateBy: vnp_CreateBy,
    vnp_OrderInfo: vnp_OrderInfo,
    vnp_TransactionDate: vnp_TransactionDate,
    vnp_CreateDate: vnp_CreateDate,
    vnp_IpAddr: vnp_IpAddr,
    vnp_SecureHash: vnp_SecureHash,
  };
  const { id } = req.params;
  const order = await Order.findById(id);

  try {
    const response = await axios.post(vnp_Api, dataObj);
    order.isRefund = true;
    await order.save();
    return res.status(200).json({ code: "00" });

    // if (response.data.code === "00") {
    //   order.isRefund = true;
    //   await order.save();
    //   return res.status(200).json({ code: "00" });
    // } else {
    //   // Handle unsuccessful response
    //   console.error("Refund failed:", response.data);
    //   return res.status(500).json({ message: "Refund failed" });
    // }
  } catch (error) {
    console.log("Refund error:", error);
    return res.status(500).json({ message: "Refund failed" });
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
