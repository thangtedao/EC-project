import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  descreaseQuantity,
  getUserCart,
} from "../controller/cartController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.patch("/add-to-cart", authenticateUser, addToCart);
router.patch("/remove-from-cart", authenticateUser, removeFromCart);
router.patch("/inc-qty", authenticateUser, increaseQuantity);
router.patch("/des-qty", authenticateUser, descreaseQuantity);
router.get("/get-cart", authenticateUser, getUserCart);

export default router;
