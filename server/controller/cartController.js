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
    if (variant) {
      cart = await Cart.findOne({
        user: userId,
        cartItem: {
          $elemMatch: {
            product: product._id,
            variant: variant,
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
      if (variant) {
        cart = await Cart.findOneAndUpdate(
          {
            user: userId,
            cartItem: {
              $elemMatch: {
                product: product._id,
                variant: variant,
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
    if (cartItem.variant) {
      cart = await Cart.findOneAndUpdate(
        {
          user: userId,
          cartItem: {
            $elemMatch: {
              product: cartItem.product._id,
              variant: variant,
            },
          },
        },
        { $inc: { "cartItem.$.quantity": 1 } },
        { new: true }
      )
        .populate("cartItem.product")
        .populate("cartItem.variant");
    } else {
      const checkQty = cartItem.quantity + 1 > cartItem.product.stockQuantity;
      if (checkQty) {
        cart = await Cart.findOne({ user: userId })
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
    if (cartItem.variant) {
      cart = await Cart.findOneAndUpdate(
        {
          user: userId,
          cartItem: {
            $elemMatch: {
              product: cartItem.product._id,
              variant: variant,
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
    if (cartItem.variant) {
      cart = await Cart.findOneAndUpdate(
        { user: userId },
        {
          $pull: {
            cartItem: {
              product: cartItem.product._id,
              variant: variant,
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
    let cart = await Cart.findOne({ user: userId }).populate({
      path: "cartItem",
      populate: [{ path: "product" }, { path: "variant" }],
    });

    let isChange = false;
    cart.cartItem.forEach((item) => {
      if (item.product.stockQuantity <= 0) {
        cart.cartItem.pull(item);
        isChange = true;
      }
      if (item.quantity > item.product.stockQuantity) {
        item.quantity = item.product.stockQuantity;
        isChange = true;
      }
    });
    if (isChange) {
      await cart.save();
      cart = await Cart.findOne({ user: userId })
        .populate("cartItem.product")
        .populate("cartItem.variant");
    }

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
