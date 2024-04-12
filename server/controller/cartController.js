import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Product from "../models/Product.js";
import ProductVariation from "../models/ProductVariation.js";
import Cart from "../models/Cart.js";
import { NotFoundError } from "../errors/customErrors.js";

export const addToCart = async (req, res) => {
  try {
    const { product, variant } = req.body;
    const { userId } = req.user;

    const isProductExist = await Product.findById(product._id);
    if (!isProductExist) throw new NotFoundError("Product Not Found");

    const isProductVariantExist = await ProductVariation.findById(variant._id);
    if (!isProductVariantExist)
      throw new NotFoundError("Product Variant Not Found");

    let cart = await Cart.findOne({ user: userId });
    let isAlreadyInCart = false;
    if (cart) {
      isAlreadyInCart = cart.cartItem.some(
        (item) => item.product.toString() === product._id.toString()
      );
    }

    if (isAlreadyInCart) {
      cart = await Cart.findOneAndUpdate(
        {
          user: userId,
          "cartItem.product": product._id,
          "cartItem.variant": variant._id,
        },
        { $inc: { "cartItem.$.quantity": 1 } },
        { new: true }
      );
    } else {
      const cartItemToAdd = {
        product: product._id,
        variant: variant._id,
        quantity: 1,
      };

      cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { cartItem: cartItemToAdd } },
        { upsert: true, new: true }
      );
    }

    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const increaseQuantity = async (req, res) => {
  try {
    const { cartItem } = req.body;
    const { userId } = req.user;

    const cart = await Cart.findOneAndUpdate(
      {
        user: userId,
        "cartItem.product": cartItem.product._id,
        "cartItem.variant": cartItem.variant._id,
      },
      { $inc: { "cartItem.$.quantity": 1 } },
      { new: true }
    );

    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const descreaseQuantity = async (req, res) => {
  try {
    const { cartItem } = req.body;
    const { userId } = req.user;

    const cart = await Cart.findOneAndUpdate(
      {
        user: userId,
        "cartItem.product": cartItem.product._id,
        "cartItem.variant": cartItem.variant._id,
        "cartItem.quantity": { $gt: 0 },
      },
      { $inc: { "cartItem.$.quantity": -1 } },
      { new: true }
    );

    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { cartItem } = req.body;
    const { userId } = req.user;

    const cart = await Cart.findOneAndUpdate(
      {
        user: userId,
        "cartItem.product": cartItem.product._id,
        "cartItem.variant": cartItem.variant._id,
        "cartItem.quantity": { $gt: 0 },
      },
      {
        $pull: {
          cartItem: {
            product: cartItem.product._id,
            variant: cartItem.variant._id,
          },
        },
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "cartItem",
      populate: [{ path: "product" }, { path: "variant" }],
    });
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const setUserCart = async (req, res) => {
  try {
    const { cartItem } = req.body;
    const { userId } = req.user;

    res.status(StatusCodes.OK).json();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const { userId } = req.user;
    res.status(StatusCodes.OK).json();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
