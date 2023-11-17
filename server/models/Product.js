import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      required: true,
    },
    salePrice: {
      type: String,
      default: null,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      //unique: true,
      default: "",
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
    review: {
      type: Array,
      default: [],
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        default: [],
      },
    ],
    totalRating: {
      type: String,
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
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
