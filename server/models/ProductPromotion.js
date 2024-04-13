import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const productPromotionSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  promotionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promotion",
  },
  salePrice: Number,
  createdAt: {
    type: Date,
    default: timeStamp,
  },
  updatedAt: {
    type: Date,
    default: timeStamp,
  },
});

export default mongoose.model("ProductPromotion", productPromotionSchema);
