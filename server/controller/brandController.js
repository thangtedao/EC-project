import Brand from "../models/Brand.js";
import { StatusCodes } from "http-status-codes";

export const createBrand = async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(StatusCodes.CREATED).json(newBrand);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "populate"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq|ne)\b/g,
      (match) => `$${match}`
    );
    let query = Brand.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }

    if (req.query.populate) {
      query = query.populate(req.query.populate);
    }

    const brands = await query;
    res.status(StatusCodes.OK).json(brands);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    res.status(StatusCodes.OK).json(brand);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json(updatedBrand);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json(deletedBrand);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
