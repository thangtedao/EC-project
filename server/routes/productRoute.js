import {
  addToWishlist,
  createProduct,
  getAllProduct,
  getRelatedProduct,
  getSingleProduct,
  rating,
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
router.get("/:id", getSingleProduct);
router.patch("/wishlist", addToWishlist);
router.patch("/rating", rating);
// có req.query rồi nên ko cần làm thủ công như này nữa
//router.get("/:category/:brand", getRelatedProduct);

export default router;
