import { Router } from "express";
import { upload } from "../middleware/uploadImages.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  searchProduct,
  rating,
  searchPageProduct,
} from "../controller/productController.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  authorizePermissions("admin"),
  upload.fields([{ name: "images", maxCount: 5 }]),
  createProduct
);
router.patch(
  "/update/:id",
  authenticateUser,
  authorizePermissions("admin"),
  upload.fields([{ name: "images", maxCount: 5 }]),
  updateProduct
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteProduct
);

router.get("/", getProducts);
router.get("/search", searchProduct);
router.get("/searchproducts", searchPageProduct);
router.patch("/rating", authenticateUser, rating);
router.get("/:id", getProduct);

export default router;
