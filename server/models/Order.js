import mongoose from "mongoose";
import { ORDER_STATUS } from "../utils/constants.js";
import { timeStamp } from "../utils/timezone.js";

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderItem: [
    {
      product: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        image: String,
      },
      variant: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariation" },
        name: String,
        value: String,
        price: Number,
      },
      quantity: {
        type: Number,
      },
      priceAtOrder: {
        type: Number,
      },
      subtotal: {
        type: Number,
      },
    },
  ],
  couponCode: {
    type: String,
  },
  discountAmount: {
    type: Number,
  },
  shippingAddress: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING,
  },
  isCancel: {
    type: Boolean,
    default: false,
  },
  isSeen: {
    type: Boolean,
    default: false,
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
