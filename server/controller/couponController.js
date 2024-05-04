import { NotFoundError } from "../errors/customErrors.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const createCoupon = async (req, res) => {
  try {
    const users = req.body.users;
    delete req.body.users;

    const newCoupon = await Coupon.create(req.body);

    if (newCoupon && users.length > 0) {
      // Lấy danh sách người dùng đã có mã giảm giá trong ví coupon của họ
      const usersWithCoupon = await User.find({
        _id: { $in: users },
        coupon: newCoupon._id,
      });

      // Lọc ra các người dùng chưa có mã giảm giá trong ví coupon của họ
      const usersToAddCoupon = users.filter(
        (userId) => !usersWithCoupon.some((user) => user._id.equals(userId))
      );

      // Thêm mã giảm giá mới vào ví coupon của các người dùng chưa có
      if (usersToAddCoupon.length > 0) {
        await User.updateMany(
          { _id: { $in: usersToAddCoupon } },
          { $push: { coupon: newCoupon._id } }
        );
      }
    }

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
    if (!validCoupon) throw new NotFoundError("Coupon không hợp lệ");

    // check expired
    const now = new Date();
    if (validCoupon.endDate < now || validCoupon.startDate > now)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Coupon không hợp lệ" });

    // check rank
    const user = await User.findById(userId);
    const requiredRanks = ["member"];
    // Thêm các hạng khác nếu coupon yêu cầu
    if (user.rank.includes("silver")) {
      requiredRanks.push("silver");
    } else if (user.rank.includes("gold")) {
      requiredRanks.push("silver");
      requiredRanks.push("gold");
    } else if (user.rank.includes("diamond")) {
      requiredRanks.push("silver");
      requiredRanks.push("gold");
      requiredRanks.push("diamond");
    }
    if (!requiredRanks.includes(validCoupon.targetCustomers)) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Bạn không đủ điều kiện" });
    }

    // check is used
    const isUse = await Order.findOne({
      user: userId,
      couponCode: validCoupon.code,
    });
    if (isUse)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Coupon đã được sử dụng" });

    // check number of use
    if (validCoupon.numberOfUses <= 0)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Coupon đã hết lượt sử dụng" });

    res.status(StatusCodes.OK).json(validCoupon);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
