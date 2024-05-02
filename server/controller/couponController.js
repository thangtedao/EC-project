import { NotFoundError } from "../errors/customErrors.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const createCoupon = async (req, res) => {
  try {
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
    let { code } = req.body;
    const { userId } = req.user;
    if (code) code = code.toString().toUpperCase();
    const validCoupon = await Coupon.findOne({ code: code });
    if (!validCoupon) throw new NotFoundError("Invalid Coupon");

    const user = await User.findById(userId);
    if (user.rank !== validCoupon.targetCustomers)
      return res.status(StatusCodes.CONFLICT).json({ msg: "Not For You" });

    const now = new Date();
    if (validCoupon.endDate < now || validCoupon.startDate > now)
      return res.status(StatusCodes.CONFLICT).json({ msg: "Code has expired" });

    const isUse = await Order.findOne({
      user: userId,
      couponCode: validCoupon.code,
    });
    if (isUse)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Coupon have been used" });

    if (validCoupon.numberOfUses <= 0)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Coupon has been fully redeemed" });

    res.status(StatusCodes.OK).json(validCoupon);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
