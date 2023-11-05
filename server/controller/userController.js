import { StatusCodes } from "http-status-codes";
import { ORDER_STATUS } from "../utils/constants.js";
import uniqid from "uniqid";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.json({ msg: "no user data" });
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  if (req.user.userId) {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  }
  res.json({ user: null });
};

export const updateUser = async (req, res) => {
  try {
    const data = { ...req.body };
    delete obj.password;
    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundError(`no product with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "updated user" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundError(`no user with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "updated user" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const blockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    if (!blockedUser) throw new NotFoundError(`no user with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "blocked user" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const unblockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    if (!unblockedUser) throw new NotFoundError(`no user with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "unblocked user" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { _id } = req.user;
    const wishlist = await User.findById(_id).populate("wishlist");
    res.status(StatusCodes.OK).json({ wishlist });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const { _id } = req.user;
    let products = [];
    const user = await User.findById(_id);
    const alreadyExistCart = await Cart.findOne({ orderBy: _id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }
    cart.map(async (item) => {
      let object = {};
      object.product = item._id;
      object.count = item.count;
      object.color = item.color;
      let getPrice = await Product.findById(item._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    });
    let cartTotal = 0;
    products.map((product) => {
      cartTotal = cartTotal + product.price * product.count;
    });
    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: _id,
    }).save();

    res.status(StatusCodes.OK).json({ newCart });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await Cart.findOne({ orderBy: _id }).populate(
      "products.product"
    );
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await Cart.findOneAndRemove({ orderBy: _id });
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;
    const { _id } = req.user;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (!validCoupon) throw new NotFoundError("Invalid Coupon");
    let { products, cartTotal } = await Cart.findOne({
      orderBy: _id,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderBy: _id },
      { totalAfterDiscount },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ totalAfterDiscount });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    if (!COD) throw new NotFoundError("Invalid Coupon");
    const userCart = await Cart.findOne({ orderBy: _id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }
    const newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: ORDER_STATUS.CASH_ON_DELIVERY,
        created: Date.now(),
        currency: "vnđ",
      },
      orderBy: _id,
      orderStatus: ORDER_STATUS.CASH_ON_DELIVERY,
    }).save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});

    res.status(StatusCodes.OK).json({ msg: "success" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { _id } = req.user;
    const userOrders = await Order.findOne({ orderBy: _id })
      .populate("products.product")
      .exec();

    res.status(StatusCodes.OK).json({ userOrders });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
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
