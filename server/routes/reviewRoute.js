import { Router } from "express";
import {
  createReview,
  deleteReplyReview,
  getReviews,
  replyReview,
} from "../controller/reviewController.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create-review", authenticateUser, createReview);
router.patch("/reply-review/:id", authenticateUser, replyReview);
router.delete(
  "/reply-review/:id",
  authenticateUser,
  authorizePermissions,
  deleteReplyReview
);
router.get("/get-reviews/:productId", getReviews);

export default router;
