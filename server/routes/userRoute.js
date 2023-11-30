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
  getSingleUser,
  getUserCart,
  getWishlist,
  unblockUser,
  updateOrderStatus,
  updateUser,
  setUserCart,
  addToWishlist,
} from "../controller/userController.js";
import { validateUpdateInput } from "../middleware/validationMiddleware.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/current-user", authenticateUser, getCurrentUser);
router.get("/single-user/:id", getSingleUser);
router.get("/all-users", getAllUsers);
router.patch("/wishlist", authenticateUser, addToWishlist);
router.get("/wishlist", authenticateUser, getWishlist);
router.post("/cart", authenticateUser, setUserCart);
router.get("/cart", authenticateUser, getUserCart);
router.delete("/empty-cart", authenticateUser, emptyCart);
router.post("/cart/apply-coupon", applyCoupon);
router.post("/cart/cash-order", createOrder);
router.get("/get-orders", getOrders);
router.patch("/order/update-order/:id", updateOrderStatus);
router.get("/admin/app-stats", authorizePermissions("admin"), blockUser);
router.patch("/update-user", authenticateUser, validateUpdateInput, updateUser);
router.delete("/delete/:id", deleteUser);
router.patch("/block-user", validateUpdateInput, blockUser);
router.patch("/unblock-user", validateUpdateInput, unblockUser);

export default router;
