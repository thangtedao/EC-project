import Review from "../models/Review.js";
import Order from "../models/Order.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export const createReview = async (req, res) => {
  try {
    const { userId } = req.user;
    const { rating, productId, content } = req.body;

    const alreadyReview = await Review.findOne({
      user: userId,
      product: productId,
    });
    if (alreadyReview) {
      alreadyReview.rating = rating;
      alreadyReview.content = content;
      await Review.findByIdAndUpdate(alreadyReview._id, alreadyReview);
      return res.status(StatusCodes.OK).send("Review updated successfully.");
    }

    const alreadyOrder = await Order.findOne({
      user: userId,
      orderItem: {
        $elemMatch: {
          "product.id": productId,
        },
      },
    });

    if (!alreadyOrder)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "You need to order the product before reviewing." });

    const review = await Review.create({
      product: productId,
      user: userId,
      rating,
      content,
    });
    res.status(StatusCodes.OK).json(review);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const replyReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const { userId } = req.user;

    const review = await Review.findById(id);
    review.replies.push({
      content: content,
      byUser: userId,
    });

    await review.save();

    res.status(StatusCodes.OK).json({ msg: "Successful" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const deleteReplyReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyId } = req.body;
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (user.role === "admin") {
      const review = await Review.findById(id);
      review.replies.pull({
        _id: replyId,
      });

      await review.save();
      return res.status(StatusCodes.OK).json({ msg: "Deleted" });
    }
    return res.status(StatusCodes.CONFLICT).json({ msg: "Not admin" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate([
      {
        path: "user",
        select: ["fullName", "avatar", "rank"],
      },
      { path: "replies.byUser", select: ["fullName", "avatar", "rank"] },
    ]);

    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
