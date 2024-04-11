import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  showStats,
  paypalPayment,
  paypalCaptureOrder,
  createPaymentUrl,
  vnpayReturn,
  vnpayIpn,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/create-paypal-order", paypalPayment);
router.post("/capture-paypal-order/:orderID", paypalCaptureOrder);

router.post("/create_payment_url", createPaymentUrl);
router.get("/vnpay_return", vnpayReturn);
router.get("/vnpay_ipn", vnpayIpn);

router.post("/create-order", createOrder);
router.get("/", getOrders);
router.get("/stats", showStats);
router.patch("/update/:id", updateOrder);
router.get("/:id", getOrder);

export default router;
