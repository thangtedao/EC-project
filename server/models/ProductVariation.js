import mongoose from "mongoose";

const productVariationSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  image: {
    type: String,
  },
  variationName: {
    type: String,
  },
  variationValue: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  salePrice: {
    type: Number,
    default: null,
  },
});

export default mongoose.model("ProductVariation", productVariationSchema);
