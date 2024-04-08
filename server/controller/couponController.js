import Coupon from "../models/Coupon.js";
import Cart from "../models/Cart.js";
import { StatusCodes } from "http-status-codes";

export const createCoupon = async (req, res) => {
  try {
    req.body.code = req.body.code.toUpperCase();
    const newCoupon = await Coupon.create(req.body);
    res.status(StatusCodes.CREATED).json(newCoupon);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(StatusCodes.OK).json(coupons);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    res.status(StatusCodes.OK).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.code.toUpperCase();
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json(deletedCoupon);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
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
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
