import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      default: "",
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://static.wikia.nocookie.net/otonari-no-tenshisama-tieng-viet/images/b/b1/JP-Manga-Vol1-Cover.jpeg/revision/latest?cb=20220730165728&path-prefix=vi",
    },
  },
  {
    toJSON: { virtual: true },
    toObject: {
      virtual: true,
    },
    timestamps: true,
  }
);

export default mongoose.model("Blog", BlogSchema);
