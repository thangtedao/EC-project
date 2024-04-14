import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const productBlogSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  content: {
    type: String,
  },
  createdAt: { type: Date, default: timeStamp },
  updatedAt: { type: Date, default: timeStamp },
});

export default mongoose.model("ProductBlog", productBlogSchema);
