import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
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
  updatedAt: { type: Date, default: timeStamp },
});

export default mongoose.model("Review", reviewSchema);
