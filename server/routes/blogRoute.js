import { Router } from "express";
import {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
} from "../controller/blogController.js";
import { blogImgResize, uploadPhoto } from "../middleware/uploadImages.js";

const router = Router();

router.post("/", createBlog);
router.patch(
  "/upload/:id",
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.patch("/update/:id", updateBlog);
router.get("/:id", getBlog);
router.delete("/:id", deleteBlog);
router.patch("/likes", likeBlog);
router.patch("/dislikes", dislikeBlog);

export default router;
