import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.json({ msg: "no user data" });
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "admin" });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "updated user" });
};
