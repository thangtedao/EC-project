import { Router } from "express";
import {
  applyCoupon,
  blockUser,
  createOrder,
  deleteUser,
  emptyCart,
  getAllUsers,
  getCurrentUser,
  getOrders,
  getUserCart,
  getWishlist,
  unblockUser,
  updateOrderStatus,
  updateUser,
  userCart,
} from "../controller/userController.js";
import { validateUpdateInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/all-users", getAllUsers);
router.get("/current-user", getCurrentUser);
router.get("/wishlist", getWishlist);
router.post("/cart", userCart);
router.delete("/empty-cart", emptyCart);
router.post("/cart/apply-coupon", applyCoupon);
router.post("/cart/cash-order", createOrder);
router.get("/cart", getUserCart);
router.get("/get-orders", getOrders);
router.patch("/order/update-order/:id", updateOrderStatus);
router.get("/admin/app-stats", authorizePermissions("admin"), blockUser);
router.patch("/update-user", validateUpdateInput, updateUser);
router.delete("/delete/:id", deleteUser);
router.patch("/block-user", validateUpdateInput, blockUser);
router.patch("/unblock-user", validateUpdateInput, unblockUser);

export default router;
