import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    default: null,
  },
  child: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Category",
      default: null,
    },
  ],
  parent: {
    type: mongoose.Schema.Types.String,
    ref: "Category",
    default: null,
  },
});

export default mongoose.model("Category", categorySchema);
