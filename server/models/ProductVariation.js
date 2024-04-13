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
  priceModifier: {
    type: Number,
  },
});

export default mongoose.model("ProductVariation", productVariationSchema);
