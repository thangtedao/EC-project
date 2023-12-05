import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    default: null,
  },
  sku: {
    type: String,
  },
  category: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Category",
      default: [],
    },
  ],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  types: {
    type: Array,
    default: [],
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  publicIdImages: {
    type: Array,
    default: [],
  },
  review: {
    type: Array,
    default: [],
  },
  ratings: [
    {
      star: Number,
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: {
        type: Date,
        default: timeStamp,
      },
    },
  ],
  totalRating: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  colors: {
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [],
  },
  viewed: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: timeStamp },
  updatedAt: { type: Date, default: timeStamp },
});

export default mongoose.model("Product", productSchema);
