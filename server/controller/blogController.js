import { NotFoundError } from "../errors/customErrors.js";
import Blog from "../models/Blog.js";
import fs from "fs";
import { cloudinaryUploadImage } from "../utils/cloudinary.js";
import expressAsyncHandler from "express-async-handler";

export const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const uploadImages = async (req, res) => {
  try {
    const { id } = req.params;
    const uploader = (path) => cloudinaryUploadImage(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.status(201).json(findBlog);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedBlog });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ deletedBlog });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

// export const getBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findById(id).populate("likes").populate("dislikes");
//     await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true });

//     if (!blog) throw new NotFoundError(`no blog with id ${id}`);
//     res.status(200).json({ blog });
//   } catch (error) {
//     res.status(409).json({ msg: error.message });
//   }
// };
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById({_id: req.params.id})
    res.status(200).json({blog:blog})
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
export const getAllBlog = async (req, res) => {
  try {
    let blogs = await Blog.find({});
    blogs = blogs.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(blogs);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const CommentBlog = expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog){
    blog.comments.push(req.body)
      const updateCommentBlog = await blog.save()
      res.send(updateCommentBlog)
  }else{
      res.status(400).send({message: 'Blog not found'})
  }
})

export const deleteComment = expressAsyncHandler(async (req, res) => {
  const {commentNumber,id}= req.body
  const blog = await Blog.findById(id)
  if(blog){
    blog.comments.splice(commentNumber,1)
    await blog.save()
    res.status(200).send(blog)
  }else{
      res.status(400).send({message: 'Blog not found'})
  }
})
export const RepCommentBlog = expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog){
      const indexComment = blog.comments.findIndex(item => item._id == req.body.idComment)
      blog.comments[indexComment].replies.push(req.body)

      await blog.save()
      res.send(blog)
  }else{
      res.status(400).send({message: 'Blog not found'})
  }
})
export const deleteRepComment = expressAsyncHandler(async (req, res) => {
  const {repCommentNumber,idComment}= req.body
  const blog = await Blog.findById(req.params.id)
  if(blog){
    const indexComment = blog.comments.findIndex(item => item._id == idComment)
    blog.comments[indexComment].replies.splice(repCommentNumber,1)
    await blog.save()
    res.status(200).send(blog)
  }else{
      res.status(400).send({message: 'Blog not found'})
  }
})
export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    const loginUserId = req?.user?._id;
    const isLiked = blog?.isLiked;
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.status(200).json({ blog });
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.status(200).json({ blog });
    } else {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.status(200).json({ blog });
    }
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const dislikeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    const loginUserId = req?.user?._id;
    const isDisliked = blog?.isDisliked;
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.status(200).json({ blog });
    }
    if (isDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.status(200).json({ blog });
    } else {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.status(200).json({ blog });
    }
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
