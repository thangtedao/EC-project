import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    sku: {
      type: String,
      //unique: true,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
      //required: true,
    },
    review: {
      type: Array,
      default: [],
    },
    rating: {
      type: Number,
      default: 5,
    },
    ordered: {
      type: Number,
      default: 0,
    },
    viewed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
