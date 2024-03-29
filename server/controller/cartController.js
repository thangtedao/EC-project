import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Cart from "../models/Cart.js";

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
