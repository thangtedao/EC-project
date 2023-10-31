import {
  createProduct,
  getAllProduct,
  getRelatedProduct,
  getSingleProduct,
} from "../controller/productController.js";
import { Router } from "express";

const router = Router();

router.post("/create", createProduct);
router.get("/all-products", getAllProduct);
router.get("/:id", getSingleProduct);
router.get("/:category/:brand", getRelatedProduct);

export default router;
