import { Router } from "express";
import {
  getAllUsers,
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controller/userController.js";
import { validateUpdateInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/get/all", getAllUsers);
router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", authorizePermissions('admin'), getApplicationStats);
router.patch("/update-user", validateUpdateInput, updateUser);

export default router;
