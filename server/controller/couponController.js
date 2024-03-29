import Coupon from "../models/Coupon.js";
import Cart from "../models/Cart.js";

export const createCoupon = async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getAllCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getSingleCoupon = async (req, res) => {
  try {
    let { name } = req.params;
    name = name.toUpperCase();
    const coupon = await Coupon.findOne({ name: name });
    res.status(200).json({ coupon });
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { name } = req.params;
    const updatedCoupon = await Coupon.findOneAndUpdate(
      { name: name },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ updatedCoupon });
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.status(200).json({ deletedCoupon });
  } catch (error) {
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
