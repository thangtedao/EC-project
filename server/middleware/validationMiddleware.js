import { body, param, validationResult } from "express-validator";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import mongoose, { mongo } from "mongoose";
import User from "../models/User.js";
import Job from "../models/Job.js";

const withValidationErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const errorMessage = error.array().map((error) => error.msg);
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

// AN EXAMPLE
/*
    export const validateTest = withValidationErrors([
    body("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("name must be at least 3"),
    ]);
*/

// Validate job input from body
export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

// Validate user input from body
export const validateRegisterInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

// Validate input from params
export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) {
      throw new BadRequestError("invalid Mongo Id");
    }

    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`no job with id ${value}`);
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("not authorized to access this route");
    }
  }),
]);

export const validateUpdateInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, {req}) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
]);