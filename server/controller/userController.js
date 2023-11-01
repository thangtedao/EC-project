import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
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

export const updateUser = async (req, res) => {
  try {
    const data = { ...req.body };
    delete obj.password;
    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundError(`no product with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "updated user" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundError(`no user with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "updated user" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const blockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    if (!blockedUser) throw new NotFoundError(`no user with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "blocked user" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const unblockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    if (!unblockedUser) throw new NotFoundError(`no user with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "unblocked user" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
