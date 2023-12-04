import Category from "../models/Category.js";
import Product from "../models/Product.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "populate"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Category.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }

    if (req.query.populate && req.query.populate === "parent") {
      query = query.populate("parent");
    }

    const categories = await query;

    let itemsPerCate = await Product.aggregate([
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ categories, itemsPerCate });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json({ category });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedCategory });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).json({ deletedCategory });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getParentCategory = async (req, res) => {
  try {
    const categories = await Category.find({ parent: null });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getChildCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Category.find({ parent: id });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
