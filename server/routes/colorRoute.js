import {
  createColor,
  deleteColor,
  getAllColor,
  updateColor,
} from "../controller/colorController.js";
import { Router } from "express";

const router = Router();

router.post("/", createColor);
router.get("/", getAllColor);
router.patch("/update/:id", updateColor);
router.delete("/delete/:id", deleteColor);

export default router;
