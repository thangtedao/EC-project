import mongoose from "mongoose";


const replyCommentBlog = new mongoose.Schema({
  author: {type: String},
  status: String,
  isAdmin: Boolean,
  avatar: {type: String},
  content: {type:String},
  byUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
const CommentBlog = mongoose.Schema({
  author: {type: String},
  status: String,
  isAdmin: Boolean,
  avatar: {type: String},
  content: {type:String},
  byUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  replies: [replyCommentBlog]
})
const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    imageTitle: String,
    description: {
      type: String,
      require: true,
    },
    content: String,
    comments:[CommentBlog]

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", BlogSchema);
