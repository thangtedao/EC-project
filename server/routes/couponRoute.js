import { Router } from "express";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupon,
  getSingleCoupon,
  updateCoupon,
} from "../controller/couponController.js";

const router = Router();

router.post("/", createCoupon);
router.get("/", getAllCoupon);
router.patch("/update/:id", updateCoupon);
router.delete("/delete/:id", deleteCoupon);
router.get("/:name", getSingleCoupon);

export default router;
