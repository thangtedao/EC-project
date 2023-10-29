import {
  createProduct,
  getAllProduct,
} from "../controller/productController.js";
import { Router } from "express";

const router = Router();

router.post("/create", createProduct);
router.get("/all", getAllProduct);

export default router;
