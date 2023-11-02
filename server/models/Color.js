import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

export default mongoose.model("Color", colorSchema);
