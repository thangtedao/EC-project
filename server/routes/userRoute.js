import { Router } from "express";
import { upload } from "../middleware/uploadImages.js";
import {
  getUsers,
  getUser,
  getCurrentUser,
  deleteUser,
  updateUser,
  blockUser,
  addToWishlist,
  addCoupon,
  getCoupons,
  removeFromWishlist,
  getWishlist,
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

router.patch("/wishlist/add", authenticateUser, addToWishlist);
router.patch("/wishlist/remove", authenticateUser, removeFromWishlist);
router.get("/wishlist", authenticateUser, getWishlist);

router.patch("/coupon", authenticateUser, addCoupon);
router.get("/coupon", authenticateUser, getCoupons);

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

export default router;
