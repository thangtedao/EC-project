import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const orderItemSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  product: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    salePrice: Number,
    images: Array,
  },
  variation: {
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
