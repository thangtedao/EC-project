import { Router } from "express";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  getCoupon,
  applyCoupon,
  updateCoupon,
} from "../controller/couponController.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  authorizePermissions("admin"),
  createCoupon
);
router.get("/all-coupons", getCoupons);
router.patch(
  "/update/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updateCoupon
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteCoupon
);
router.get("/apply", authenticateUser, applyCoupon);
router.get("/:id", getCoupon);

export default router;
