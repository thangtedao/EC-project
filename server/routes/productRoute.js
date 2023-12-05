import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductByCategory,
  getSingleProduct,
  rating,
  searchProduct,
  updateProduct,
} from "../controller/productController.js";
import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadImages.js";

const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createProduct
);
router.patch(
  "/update/:slug",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);
router.get("/", getAllProduct);
router.get("/search", searchProduct);
router.delete("/:id", deleteProduct);
router.get("/category", getProductByCategory);
router.get("/:slug", getSingleProduct);
router.patch("/rating", authenticateUser, rating);

export default router;
