import {
  createProduct,
  getAllProduct,
  getRelatedProduct,
  getSingleProduct,
} from "../controller/productController.js";
import { Router } from "express";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
// có req.query rồi nên ko cần làm thủ công như này nữa
//router.get("/:category/:brand", getRelatedProduct);

export default router;
