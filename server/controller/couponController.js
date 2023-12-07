import Coupon from "../models/Coupon.js";

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
    const { id } = req.params;
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedCoupon });
  } catch (error) {
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
