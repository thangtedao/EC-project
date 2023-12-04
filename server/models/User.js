import mongoose from "mongoose";
import moment from "moment-timezone";

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
    city: { type: String, default: "" },
    district: { type: String, default: "" },
    ward: { type: String, default: "" },
    home: { type: String, default: "" },
  },
  gender: {
    type: String,
  },
  birthday: {
    type: Date,
    default: new Date("1900-01-01"),
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
    default: () => moment.tz("Asia/Ho_Chi_Minh").format(),
  },
  updatedAt: {
    type: Date,
    default: () => moment.tz("Asia/Ho_Chi_Minh").format(),
  },
});

// get user info without passwword
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", UserSchema);
export default User;
