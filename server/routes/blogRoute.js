import { Router } from "express";
import {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} from "../controller/blogController";

const router = Router();

router.post("/", createBlog);
router.patch("/update/:id", updateBlog);
router.get("/:id", getBlog);
router.delete("/:id", deleteBlog);
router.put("/likes", likeBlog);
router.put("/dislikes", dislikeBlog);

export default router;
