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
    enum: ["percentage", "fixed"],
    default: "fixed",
  },
  discountValue: {
    type: Number,
  },
  numberOfUses: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    default: "",
  },
  promotionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promotion",
    default: null,
  },
  targetCustomers: {
    type: String,
    enum: ["member", "silver", "gold", "diamond"],
    default: "member",
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
