import mongoose from "mongoose";
import { ORDER_STATUS } from "../utils/constants.js";
import { timeStamp } from "../utils/timezone.js";

const orderSchema = mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      count: Number,
    },
  ],
  totalPrice: {
    type: Number,
  },
  paymentIntent: {
    type: String,
    default: "",
  },
  orderStatus: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.NOT_PROCESSED,
  },
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
