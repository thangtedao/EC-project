import { PRODUCT_STATUS } from "../utils/constants.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import day from "dayjs";
import { createPayPalOrder } from "../utils/paypal.js";
import { sendMail } from "../utils/email.js";

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

    const products = cart.map((product) => {
      return {
        product: product.product._id,
        price: product.product.salePrice,
        count: product.count,
      };
    });

    let totalPrice =
      cart?.reduce(
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
    console.log(error);
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

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const findOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json({ findOrder });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
