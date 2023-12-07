import { StatusCodes } from "http-status-codes";
import { ORDER_STATUS } from "../utils/constants.js";
import uniqid from "uniqid";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";
import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import fs from "fs";
import { formatImage } from "../middleware/uploadImages.js";

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

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    if (req.user.userId) {
      const user = await User.findById(req.user.userId);
      const userWithoutPassword = user.toJSON();
      res.status(StatusCodes.OK).json({ user: userWithoutPassword });
    } else {
      res.json({ user: null });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const data = { ...req.body };
    delete data.password;
    if (data.city && data.district && data.ward && data.home) {
      const address = {
        city: data.city,
        district: data.district,
        ward: data.ward,
        home: data.home,
      };
      delete data.city;
      delete data.district;
      delete data.ward;
      delete data.home;
      data.address = address;
    }

    // if (req.file) {
    //   const response = await cloudinaryUploadImage(req.file.path);
    //   fs.unlinkSync(req.file.path);
    //   data.avatar = response.secure_url;
    //   data.avatarPublicId = response.public_id;
    // }

    if (req.file) {
      const file = formatImage(req.file);
      const response = await cloudinaryUploadImage(file);
      data.avatar = response.secure_url;
      data.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data);

    if (req.file && updatedUser.avatarPublicId) {
      await cloudinaryDeleteImage(updatedUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ msg: "updated user" });
  } catch (error) {
    console.log(error);
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

export const setUserCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const { userId } = req.user;

    const alreadyExistCart = await Cart.findOne({ user: userId });
    if (alreadyExistCart) {
      await Cart.deleteOne({ _id: alreadyExistCart._id });
    }

    const productPromise = cart.map(async (item) => {
      // const product = await Product.findById(item._id).select("price").exec();
      return {
        product: item._id,
        count: item.count,
        salePrice: item.salePrice,
      };
    });

    const products = await Promise.all(productPromise);

    let cartTotal = products.reduce(
      (acc, product) => acc + product.salePrice * product.count,
      0
    );

    const newCart = new Cart({
      products,
      cartTotal,
      user: userId,
    });

    await newCart.save();

    res.status(StatusCodes.OK).json({ newCart });
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    console.log(cart);
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOneAndRemove({ user: userId });
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;
    const { userId } = req.user;
    const validCoupon = await Coupon.findOne({ name: coupon });

    if (!validCoupon) throw new NotFoundError("Invalid Coupon");
    let { products, cartTotal } = await Cart.findOne({
      user: userId,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { user: userId },
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
    const { userId } = req.user;
    if (!COD) throw new NotFoundError("Invalid Coupon");
    const userCart = await Cart.findOne({ user: userId });
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
      user: userId,
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
    const { userId } = req.user;
    const userOrders = await Order.findOne({ orderBy: userId })
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

export const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.body;
    const user = await User.findById(userId);

    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === productId
    );
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "removed" });
    } else {
      let user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "added" });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.user;
    const wishlist = await User.findById(userId).populate({
      path: "wishlist",
      select: [
        "name",
        "price",
        "slug",
        "salePrice",
        "description",
        "category",
        "images",
      ],
    });
    res.status(StatusCodes.OK).json({ wishlist });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
