import mongoose from "mongoose";
import { ORDER_STATUS } from "../utils/constants.js";
import { timeStamp } from "../utils/timezone.js";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  CouponCode: {
    type: String,
  },
  DiscountAmount: {
    type: Number,
  },
  ShippingAddress: {
    type: String,
  },
  PaymentMethod: {
    type: String,
  },
  TotalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.NOT_PROCESSED,
  },
  createdAt: {
    type: Date,
    default: timeStamp,
  },
  updatedAt: {
    type: Date,
    default: timeStamp,
  },
});

export default mongoose.model("Order", orderSchema);
