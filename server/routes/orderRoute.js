import express from "express";
import {
  getAllOrder,
  getSingleOrder,
  showStats,
  stripePayment,
  stripeWebHook,
  updateOrder,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/create-checkout-session", stripePayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHook
);
router.get("/", getAllOrder);
router.get("/stats", showStats);
router.get("/:id", getSingleOrder);
router.patch("/update/:id", updateOrder);

export default router;
