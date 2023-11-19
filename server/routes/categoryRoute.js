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
router.get("/:id", getSingleCategory);
router.patch("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/get/parent", getParentCategory);
router.get("/get/child/:id", getChildCategory);

export default router;

// blog category 5:33:44 - https://www.youtube.com/watch?v=S6Yd5cPtXr4&list=PL0g02APOH8okXhOQLOLcB_nifs1U41im5
