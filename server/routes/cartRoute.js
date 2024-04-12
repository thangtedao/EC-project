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

router.post("/add-to-cart", authenticateUser, addToCart);
router.post("/remove-from-cart", authenticateUser, removeFromCart);
router.post("/inc-qty", authenticateUser, increaseQuantity);
router.post("/dec-qty", authenticateUser, descreaseQuantity);
router.post("/get-cart", authenticateUser, getUserCart);

export default router;
