import { Router } from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  uploadImages,
  getAllBlog,
  CommentBlog,
  RepCommentBlog,
  deleteComment,
  deleteRepComment,
  getBlogsWithNewComent,
} from "../controller/blogController.js";
import { blogImgResize, uploadPhoto } from "../middleware/uploadImages.js";

const router = Router();

router.post("/create", createBlog);
router.patch(
  "/upload/:id",
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.patch("/update/:id", updateBlog);
router.get("/all-blogs", getAllBlog);
router.get("/allblogswithnewcomment", getBlogsWithNewComent);
router.delete("/:id", deleteBlog);
router.post("/comment/:id", CommentBlog);
router.delete("/comment/:id", deleteComment);
router.post("/rep/comment/:id", RepCommentBlog);
router.delete("/rep/comment/:id", deleteRepComment);
router.get("/:id", getBlog);

export default router;
