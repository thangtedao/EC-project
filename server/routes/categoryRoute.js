import {
  createCategory,
  getAllCategory,
  getChildCategory,
  getParentCategory,
} from "../controller/categoryController.js";
import { Router } from "express";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.get("/get/parent", getParentCategory);
router.get("/get/child/:id", getChildCategory);

export default router;
