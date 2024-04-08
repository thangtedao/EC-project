import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed amount"],
    default: "fixed amount",
  },
  discountValue: {
    type: Number,
  },
  description: {
    type: String,
    default: "",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Coupon", couponSchema);
