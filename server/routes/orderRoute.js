import express from "express";
import {
  createOrder,
  getAllOrder,
  getSingleOrder,
  showStats,
  paypalPayment,
  stripePayment,
  stripeWebHook,
  updateOrder,
  paypalCaptureOrder,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/create-checkout-session", stripePayment);
router.post("/create-paypal-order", paypalPayment);
router.post("/capture-paypal-order/:orderID", paypalCaptureOrder);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHook
);
router.post("/create-order", createOrder);
router.get("/", getAllOrder);
router.get("/stats", showStats);
router.get("/:id", getSingleOrder);
router.patch("/update/:id", updateOrder);

export default router;
