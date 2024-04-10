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
  type: {
    type: String,
    enum: ["percentage", "fixed amount"],
    default: "fixed amount",
  },
  value: {
    type: Number,
    default: 0,
  },
  applicableProducts: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      productVariant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariation",
      },
    },
  ],
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  targetCustomers: {
    type: String,
    enum: ["member", "silver", "gold", "diamond"],
    default: "member",
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

export default mongoose.model("Promotion", promotionSchema);
