import { Stripe } from "stripe";
import { PRODUCT_STATUS } from "../utils/constants.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import day from "dayjs";
import { createPayPalOrder } from "../utils/paypal.js";
import { sendMail } from "../utils/email.js";
import User from "../models/User.js";

const stripe = Stripe(process.env.STRIPE_KEY);

export const stripePayment = async (req, res) => {
  try {
    const cart = req.body.cart.products.map((item) => {
      return {
        id: item.product._id,
        count: item.count,
        salePrice: item.product.salePrice,
      };
    });

    let customer;
    if (req.body.coupon) {
      customer = await stripe.customers.create({
        metadata: {
          userId: req.body.user._id,
          cart: JSON.stringify(cart),
          coupon: JSON.stringify({
            id: req.body.coupon,
            discount: req.body.coupon.discount,
          }),
        },
      });
    } else {
      customer = await stripe.customers.create({
        metadata: {
          userId: req.body.user._id,
          cart: JSON.stringify(cart),
        },
      });
    }

    const line_items = req.body.cart.products.map((item) => {
      let productPrice = item.product.salePrice;
      if (req.body.coupon) {
        productPrice = (
          productPrice -
          (productPrice * req.body.coupon.discount) / 100
        ).toFixed(0);
      }
      return {
        price_data: {
          currency: "vnd",
          product_data: {
            name: item.product.name,
            images: [item.product.images[0]],
            metadata: {
              id: item.product._id,
            },
          },
          unit_amount: productPrice,
        },
        quantity: item.count,
      };
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: "https://nova-store-uqza.onrender.com/order",
      cancel_url: "https://nova-store-uqza.onrender.com/cart",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

// let endpointSecret;
const endpointSecret =
  "whsec_99790e278153b08aeb4d7857f693cca685b854d4c733b686450fb260424bda90";

export const stripeWebHook = async (req, response) => {
  const sig = req.headers["stripe-signature"];

  let data;
  let eventType;
  let event;

  if (endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }
  console.log(eventType);

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrderByStripe(customer, data);
      })
      .catch((err) => console.log(err));
  }

  // Handle the event

  // switch (event.type) {
  //   case "payment_intent.succeeded":
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  response.send().end();
};

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

const createOrderByStripe = async (customer, data) => {
  try {
    const cart = JSON.parse(customer.metadata.cart);
    const products = cart.map((product) => {
      return {
        product: product.id,
        price: product.salePrice,
        count: product.count,
      };
    });

    let totalPrice =
      cart?.reduce(
        (accumulator, item) => accumulator + item.salePrice * item.count,
        0
      ) || 0;

    let newOrder;
    if (customer.metadata.coupon) {
      const coupon = JSON.parse(customer.metadata.coupon);
      totalPrice = (totalPrice - (totalPrice * coupon.discount) / 100).toFixed(
        0
      );
      newOrder = new Order({
        orderBy: customer.metadata.userId,
        products: products,
        totalPrice: totalPrice,
        coupon: {
          couponId: coupon.id,
          name: coupon.name,
          discount: coupon.discount,
        },
        paymentIntent: data.payment_intent,
      });
    } else {
      newOrder = new Order({
        orderBy: customer.metadata.userId,
        products: products,
        totalPrice: totalPrice,
        paymentIntent: data.payment_intent,
      });
    }

    const savedOrder = await newOrder.save();
    await Cart.findOneAndUpdate(
      { user: customer.metadata.userId },
      { $set: { products: [] } }
    );
    console.log(savedOrder);

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

    const user = await User.findById(customer.metadata.userId);
    sendMail(user, order);
  } catch (error) {
    console.log(error);
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
      $limit: 6,
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
