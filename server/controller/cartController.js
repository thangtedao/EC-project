import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Product from "../models/Product.js";
import ProductVariation from "../models/ProductVariation.js";
import Cart from "../models/Cart.js";
import { NotFoundError } from "../errors/customErrors.js";

export const addToCart = async (req, res) => {
  try {
    let { product, variant } = req.body;
    const { userId } = req.user;

    const isProductExist = await Product.findById(product._id);
    if (!isProductExist) throw new NotFoundError("Product Not Found");

    let cart;
    let isAlreadyInCart = false;

    // check if product in cart
    if (variant && variant.length > 0) {
      const variantIds = variant?.map((item) => item);
      cart = await Cart.findOne({
        user: userId,
        cartItem: {
          $elemMatch: {
            product: product._id,
            variant: { $all: variantIds },
          },
        },
      });
      if (cart) isAlreadyInCart = true;
    } else {
      cart = await Cart.findOne({
        user: userId,
        "cartItem.product": product._id,
      });
      if (cart) isAlreadyInCart = true;
    }

    // inc qty or add product
    if (isAlreadyInCart) {
      // inc qty
      if (variant && variant.length > 0) {
        const variantIds = variant.map((item) => item);
        cart = await Cart.findOneAndUpdate(
          {
            user: userId,
            cartItem: {
              $elemMatch: {
                product: product._id,
                variant: { $all: variantIds },
              },
            },
          },
          { $inc: { "cartItem.$.quantity": 1 } },
          { new: true }
        );
      } else {
        cart = await Cart.findOneAndUpdate(
          {
            user: userId,
            "cartItem.product": product._id,
          },
          { $inc: { "cartItem.$.quantity": 1 } },
          { new: true }
        );
      }
    } else {
      // add product
      const cartItemToAdd = {
        product: product._id,
        variant: variant,
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

    let cart;
    if (cartItem.variant.length > 0) {
      cart = await Cart.findOneAndUpdate(
        {
          user: userId,
          cartItem: {
            $elemMatch: {
              product: cartItem.product._id,
              variant: { $all: cartItem.variant },
            },
          },
        },
        { $inc: { "cartItem.$.quantity": 1 } },
        { new: true }
      )
        .populate("cartItem.product")
        .populate("cartItem.variant");
    } else {
      cart = await Cart.findOneAndUpdate(
        {
          user: userId,
          "cartItem.product": cartItem.product._id,
        },
        { $inc: { "cartItem.$.quantity": 1 } },
        { new: true }
      )
        .populate("cartItem.product")
        .populate("cartItem.variant");
    }

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

    let cart;
    if (cartItem.variant.length > 0) {
      cart = await Cart.findOneAndUpdate(
        {
          user: userId,
          cartItem: {
            $elemMatch: {
              product: cartItem.product._id,
              variant: { $all: cartItem.variant },
              quantity: { $gt: 1 },
            },
          },
        },
        { $inc: { "cartItem.$.quantity": -1 } },
        { new: true }
      )
        .populate("cartItem.product")
        .populate("cartItem.variant");
    } else {
      cart = await Cart.findOneAndUpdate(
        {
          user: userId,
          cartItem: {
            $elemMatch: {
              product: cartItem.product._id,
              quantity: { $gt: 1 },
            },
          },
        },
        { $inc: { "cartItem.$.quantity": -1 } },
        { new: true }
      )
        .populate("cartItem.product")
        .populate("cartItem.variant");
    }

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

    let cart;
    if (cartItem.variant.length > 0) {
      cart = await Cart.findOneAndUpdate(
        { user: userId },
        {
          $pull: {
            cartItem: {
              product: cartItem.product._id,
              variant: { $all: cartItem.variant },
            },
          },
        },
        { new: true }
      )
        .populate("cartItem.product")
        .populate("cartItem.variant");
    } else {
      cart = await Cart.findOne({
        user: userId,
      });

      cart.cartItem = cart.cartItem.filter(
        (item) => item.product.toString() !== cartItem.product._id.toString()
      );

      cart = await Cart.findByIdAndUpdate(
        cart._id,
        { cartItem: cart.cartItem },
        { new: true }
      )
        .populate("cartItem.product")
        .populate("cartItem.variant");
    }

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
    console.log(error);
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
