import mongoose from "mongoose";
import { timeStamp } from "../utils/timezone.js";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "",
  },
  avatarPublicId: {
    type: String,
    default: "",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  wishlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
  ],
  createdAt: {
    type: Date,
    default: timeStamp,
  },
  updatedAt: {
    type: Date,
    default: timeStamp,
  },
});

// get user info without passwword
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
