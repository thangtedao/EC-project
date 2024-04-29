import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";
import {
  createPromotion,
  getPromotion,
  setPrice,
  updatePromotion,
} from "../controller/promotionController.js";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  authorizePermissions("admin"),
  createPromotion
);
router.patch(
  "/update/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updatePromotion
);
router.patch("/set-price/:id", setPrice);
router.get("/:id", getPromotion);

export default router;
