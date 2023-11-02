import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      count: Number,
      color: String,
      price: Number,
    },
  ],
  cartTotal: Number,
  totalAfterDiscount: Number,
});

export default mongoose.model("Cart", cartSchema);
