import {
  createProduct,
  deleteImages,
  deleteProduct,
  getAllProduct,
  getProductByCategory,
  getRelatedProduct,
  getSingleProduct,
  rating,
  updateProduct,
  uploadImages,
} from "../controller/productController.js";
import { Router } from "express";
import { productImgResize, uploadPhoto } from "../middleware/uploadImages.js";
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
router.delete("/:id", deleteProduct);
router.get("/category", getProductByCategory);
router.get("/:slug", getSingleProduct);
router.patch("/rating", authenticateUser, rating);

router.delete("/delete-img/:id", deleteImages);
router.patch(
  "/upload/:id",
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

export default router;
