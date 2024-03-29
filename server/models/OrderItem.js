import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const orderItemSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  variationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVariation",
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
  createdAt: {
    type: Date,
    default: timeStamp,
  },
  updatedAt: {
    type: Date,
    default: timeStamp,
  },
});

export default mongoose.model("OrderItem", orderItemSchema);
