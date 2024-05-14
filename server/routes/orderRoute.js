import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  cancelOrder,
  showStats,
  paypalPayment,
  paypalCaptureOrder,
  createPaymentUrl,
  vnpayReturn,
  vnpayIpn,
  showStats2,
  getBestSalerProduct,
  createGhnOrder,
  printGhnOrder,
  refundOrder,
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
router.post("/refund/:id", refundOrder)

router.post("/create-order", authenticateUser, createOrder);
router.get("/", authenticateUser, getOrders);
router.patch(
  "/update/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updateOrder
);
router.patch(
  "/create-ghn-order/:id",
  authenticateUser,
  authorizePermissions("admin"),
  createGhnOrder
);
router.patch(
  "/print-ghn-order/:id",
  authenticateUser,
  authorizePermissions("admin"),
  printGhnOrder
);
router.patch("/cancel/:id", authenticateUser, cancelOrder);
router.post(
  "/stats",
  authenticateUser,
  authorizePermissions("admin"),
  showStats
);
router.get(
  "/stats-product",
  authenticateUser,
  authorizePermissions("admin"),
  showStats2
);
router.get("/bestsalerproduct", getBestSalerProduct);
router.get("/:id", authenticateUser, getOrder);

export default router;
