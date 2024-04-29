import Blog from "../models/Blog.js";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { cloudinaryUploadImage } from "../utils/cloudinary.js";
import expressAsyncHandler from "express-async-handler";

export const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(StatusCodes.CREATED).json(newBlog);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
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
    res.status(StatusCodes.OK).json(findBlog);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json({ updatedBlog });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ deletedBlog });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(StatusCodes.OK).json(blog);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    let blogs = await Blog.find().sort("-createdAt");
    res.status(StatusCodes.OK).json(blogs);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getBlogsWithNewComent = async (req, res) => {
  try {
    const blogs = await Blog.find({ hasNewComment: true }).sort({
      updatedAt: -1,
    });

    res.status(StatusCodes.OK).json(blogs);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const CommentBlog = expressAsyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      blog.comments.push(req.body);
      blog.hasNewComment = true;
      const updateCommentBlog = await blog.save();
      res.status(StatusCodes.OK).send(updateCommentBlog);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
});

export const deleteComment = expressAsyncHandler(async (req, res) => {
  try {
    const { commentNumber, id } = req.body;
    let blog = await Blog.findById(id);
    if (blog) {
      blog.comments.splice(commentNumber, 1);
      blog = await blog.save();
      res.status(StatusCodes.OK).send(blog);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
});

export const RepCommentBlog = expressAsyncHandler(async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (blog) {
      const indexComment = blog.comments.findIndex(
        (item) => item._id == req.body.idComment
      );
      blog.comments[indexComment].replies.push(req.body);
      blog.hasNewComment = true;
      blog = await blog.save();
      res.status(StatusCodes.OK).send(blog);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
});

export const deleteRepComment = expressAsyncHandler(async (req, res) => {
  try {
    const { repCommentNumber, idComment } = req.body;
    let blog = await Blog.findById(req.params.id);
    if (blog) {
      const indexComment = blog.comments.findIndex(
        (item) => item._id == idComment
      );
      blog.comments[indexComment].replies.splice(repCommentNumber, 1);
      blog = await blog.save();
      res.status(StatusCodes.OK).send(blog);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
});
