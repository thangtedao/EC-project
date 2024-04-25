import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";
import { PRODUCT_STATUS } from "../utils/constants.js";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    default: null,
  },
  pmtPrice: {
    type: Number,
    default: null,
  },
  model: {
    type: String,
    lowercase: true,
  },
  description: {
    type: String,
    default: "",
  },
  images: {
    type: Array,
    default: [],
  },
  publicIdImages: {
    type: Array,
    default: [],
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  status: {
    type: String,
    enum: Object.values(PRODUCT_STATUS),
    default: PRODUCT_STATUS.AVAILABLE,
  },
  specifications: {
    type: String,
  },
  viewed: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: timeStamp },
  updatedAt: { type: Date, default: timeStamp },
});

export default mongoose.model("Product", productSchema);
