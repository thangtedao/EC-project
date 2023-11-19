import express from "express";
import { stripePayment } from "../controller/orderController.js";

const router = express.Router();

router.post("/create-checkout-session", stripePayment);

export default router;
