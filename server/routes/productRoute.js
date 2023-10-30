import {
  createProduct,
  getAllProduct,
  getSingleProduct,
} from "../controller/productController.js";
import { Router } from "express";

const router = Router();

router.post("/create", createProduct);
router.get("/all-products", getAllProduct);
router.get("/:id", getSingleProduct);

export default router;
