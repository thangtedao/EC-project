import Job from "../models/Job.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createBy: req.user.userId });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`no job with id ${id}`);
  res.json(job);
};

export const createJob = async (req, res) => {
  try {
    req.body.createBy = req.user.userId;
    const newJob = await Job.create(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const editJob = async (req, res) => {
  const { id } = req.params;
  const updatedjob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedjob) throw new NotFoundError(`no job with id ${id}`);
  res.json(updatedjob);
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const deletedjob = await Job.findByIdAndDelete(id);
  if (!deletedjob) throw new NotFoundError(`no job with id ${id}`);
  res.status(200).json({ msg: `deleted job with id ${id}` });
};
