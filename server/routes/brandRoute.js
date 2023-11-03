import {
  createBrand,
  deleteBrand,
  getAllBrand,
  updateBrand,
} from "../controller/brandController.js";
import { Router } from "express";

const router = Router();

router.post("/", createBrand);
router.get("/", getAllBrand);
router.patch("/update/:id", updateBrand);
router.delete("/delete/:id", deleteBrand);

export default router;
