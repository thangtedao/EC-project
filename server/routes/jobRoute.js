import {
  getAllJobs,
  getSingleJob,
  createJob,
  editJob,
  deleteJob,
} from "../controller/jobController.js";
import { Router } from "express";
import { validateIdParam, validateJobInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/get/all", getAllJobs);
router.get("/get/:id", validateIdParam, getSingleJob);
router.post("/create", validateJobInput, createJob);
router.patch("/edit/:id", validateIdParam, validateJobInput, editJob);
router.delete("/delete/:id", validateIdParam, deleteJob);

export default router;
