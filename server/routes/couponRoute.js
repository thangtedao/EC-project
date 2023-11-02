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
router.get("/:id", getSingleCoupon);

export default router;

// blog category 5:33:44 - https://www.youtube.com/watch?v=S6Yd5cPtXr4&list=PL0g02APOH8okXhOQLOLcB_nifs1U41im5
