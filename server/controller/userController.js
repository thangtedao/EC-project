import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { formatImage } from "../middleware/uploadImages.js";
import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import uniqid from "uniqid";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });
    if (!users) {
      return res.json({ msg: "Users does not exist" });
    }
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const data = { ...req.body };
    delete data.password;
    if (data.city && data.district && data.ward && data.home) {
      const address = {
        city: data.city,
        district: data.district,
        ward: data.ward,
        home: data.home,
      };
      delete data.city;
      delete data.district;
      delete data.ward;
      delete data.home;
      data.address = address;
    }

    // if (req.file) {
    //   const response = await cloudinaryUploadImage(req.file.path);
    //   fs.unlinkSync(req.file.path);
    //   data.avatar = response.secure_url;
    //   data.avatarPublicId = response.public_id;
    // }

    if (req.file) {
      const file = formatImage(req.file);
      const response = await cloudinaryUploadImage(file);
      data.avatar = response.secure_url;
      data.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data);

    if (req.file && updatedUser.avatarPublicId) {
      await cloudinaryDeleteImage(updatedUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ msg: "User's updated" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundError(`User does not exist`);
    res.status(StatusCodes.OK).json({ msg: "User's deleted" });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
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
    if (!blockedUser) throw new NotFoundError(`User does not exist`);
    res.status(StatusCodes.OK).json({ msg: "User's blocked" });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
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
    if (!unblockedUser) throw new NotFoundError(`User does not exist`);
    res.status(StatusCodes.OK).json({ msg: "User's unblocked" });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.body;
    const user = await User.findById(userId);

    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === productId
    );
    if (alreadyAdded) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.status(StatusCodes.OK).json({ msg: "Removed" });
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.status(StatusCodes.OK).json({ msg: "Added" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.user;
    const { wishlist } = await User.findById(userId).populate({
      path: "wishlist",
      select: [
        "name",
        "slug",
        "price",
        "salePrice",
        "description",
        "category",
        "images",
        "status",
      ],
    });
    res.status(StatusCodes.OK).json(wishlist);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
