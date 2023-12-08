import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getChildCategory,
  getParentCategory,
  getSingleCategory,
  updateCategory,
} from "../controller/categoryController.js";
import { Router } from "express";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.get("/:slug", getSingleCategory);
router.patch("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/get/parent", getParentCategory);
router.get("/get/child/:id", getChildCategory);

export default router;
