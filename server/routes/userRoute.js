import { Router } from "express";
import {
  blockUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  unblockUser,
  updateUser,
} from "../controller/userController.js";
import { validateUpdateInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/all-users", getAllUsers);
router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", authorizePermissions("admin"), blockUser);
router.patch("/update-user", validateUpdateInput, updateUser);
router.delete("/delete/:id", deleteUser);
router.patch("/block-user", validateUpdateInput, blockUser);
router.patch("/unblock-user", validateUpdateInput, unblockUser);

export default router;
