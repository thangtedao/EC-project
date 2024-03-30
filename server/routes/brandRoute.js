import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrands,
  getBrand,
  updateBrand,
} from "../controller/brandController.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  authorizePermissions("admin"),
  createBrand
);
router.get("/all-brands", getBrands);
router.get("/:id", getBrand);
router.patch(
  "/update/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updateBrand
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteBrand
);

export default router;
