import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
  },
  content: {
    type: String,
  },
  createdAt: { type: Date, default: timeStamp },
});

export default mongoose.model("Review", reviewSchema);
