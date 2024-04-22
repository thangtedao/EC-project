import { Router } from "express";
import { upload } from "../middleware/uploadImages.js";
import {
  getUsers,
  getUser,
  getCurrentUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  getWishlist,
  addToWishlist,
  addCoupon,
  getCoupons,
} from "../controller/userController.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

const router = Router();

/* USER */
router.get("/current-user", authenticateUser, getCurrentUser);
router.patch(
  "/update-user",
  authenticateUser,
  upload.single("avatar"),
  updateUser
);

router.patch("/wishlist", authenticateUser, addToWishlist);
router.get("/wishlist", authenticateUser, getWishlist);

router.patch("/coupon", authenticateUser, addCoupon);
router.get("/coupon", authenticateUser, getCoupons);

// router.post("/cart", authenticateUser, setUserCart);
// router.get("/cart", authenticateUser, getUserCart);
// router.delete("/empty-cart", authenticateUser, emptyCart);
// router.post("/cart/apply-coupon", applyCoupon);

/* ADMIN */
router.get(
  "/admin/all-users",
  authenticateUser,
  authorizePermissions("admin"),
  getUsers
);
router.get(
  "/admin/user-profile/:id",
  authenticateUser,
  authorizePermissions("admin"),
  getUser
);
router.delete(
  "/admin/delete/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteUser
);
router.patch(
  "/admin/block-user/:id",
  authenticateUser,
  authorizePermissions("admin"),
  blockUser
);
router.patch(
  "/admin/unblock-user/:id",
  authorizePermissions("admin"),
  unblockUser
);

export default router;
