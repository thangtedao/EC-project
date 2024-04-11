import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const promotionSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    default: "percentage",
  },
  discountValue: {
    type: Number,
    default: 0,
  },
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  createdAt: {
    type: Date,
    default: timeStamp,
  },
  updatedAt: {
    type: Date,
    default: timeStamp,
  },
});

export default mongoose.model("Promotion", promotionSchema);
