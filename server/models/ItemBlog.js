import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const itemBlogSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  content: {
    type: String,
  },
  createdAt: { type: Date, default: timeStamp },
  updatedAt: { type: Date, default: timeStamp },
});

export default mongoose.model("ItemBlog", itemBlogSchema);
