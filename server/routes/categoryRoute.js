import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getChildCategoryByParentId,
  getchildCategory,
  getParentCategory,
  getCategory,
  updateCategory,
} from "../controller/categoryController.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  authorizePermissions("admin"),
  createCategory
);
router.get("/all-categories", getCategories);
router.get("/:id", getCategory);
router.patch(
  "/update/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updateCategory
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteCategory
);
router.get("/get/parent", getParentCategory);
router.get("/get/child", getchildCategory);
router.get("/get/child/:parentId", getChildCategoryByParentId);

export default router;
