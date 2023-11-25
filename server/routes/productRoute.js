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

const router = Router();

router.post("/", createProduct);
router.patch(
  "/upload/:id",
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.get("/", getAllProduct);
router.get("/category", getProductByCategory);
router.delete("/:id", deleteProduct);
router.get("/:slug", getSingleProduct);
router.patch("/update/:slug", updateProduct);
router.patch("/rating", rating);
router.delete("/delete-img/:id", deleteImages);

export default router;
