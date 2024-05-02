import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const promotionSchema = mongoose.Schema(
  {
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
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Promotion", promotionSchema);
