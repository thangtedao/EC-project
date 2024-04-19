import mongoose from "mongoose";


const replieCommentBlog = new mongoose.Schema({
  content: {type: String},
  isAdmin: Boolean,
  nameUser: {type: String},
  byUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
const CommentBlog = mongoose.Schema({
  author: {type: String},
  status: String,
  isAdmin: Boolean,
  avatar: {type: String},
  content: {type:String},
  byUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  replies: [replieCommentBlog]
})
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
    content: String,
    comment:[CommentBlog]

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", BlogSchema);
