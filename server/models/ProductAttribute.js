import mongoose from "mongoose";

const productAttributeSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  attributeName: {
    type: String,
  },
  attributeValue: {
    type: String,
  },
  mainAttribute: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("ProductAttribute", productAttributeSchema);
