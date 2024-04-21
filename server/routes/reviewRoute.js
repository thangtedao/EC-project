import { Router } from "express";
import { createReview, getReviews } from "../controller/reviewController.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/create-review", authenticateUser, createReview);
router.get("/get-reviews/:productId", getReviews);

export default router;
