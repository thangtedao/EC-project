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
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-paypal-order", authenticateUser, paypalPayment);
router.post(
  "/capture-paypal-order/:orderID",
  authenticateUser,
  paypalCaptureOrder
);

router.post("/create_payment_url", authenticateUser, createPaymentUrl);
router.get("/vnpay_return", authenticateUser, vnpayReturn);
router.get("/vnpay_ipn", authenticateUser, vnpayIpn);

router.post("/create-order", authenticateUser, createOrder);
router.get("/", authenticateUser, getOrders);
router.patch(
  "/update/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updateOrder
);
router.post(
  "/stats",
  authenticateUser,
  authorizePermissions("admin"),
  showStats
);
router.get("/:id", authenticateUser, getOrder);

export default router;
