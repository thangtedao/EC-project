import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";
import {
  createPromotion,
  getPromotion,
} from "../controller/promotionController.js";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  authorizePermissions("admin"),
  createPromotion
);
router.get("/:id", getPromotion);

export default router;
