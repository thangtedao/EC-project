import express from "express";
import { stripePayment, stripeWebHook } from "../controller/orderController.js";

const router = express.Router();

router.post("/create-checkout-session", stripePayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHook
);

export default router;
