import Category from "../models/Category.js";
import ItemBlog from "../models/ItemBlog.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";

export const createCategory = async (req, res) => {
  try {
    const data = { ...req.body };
    const blog = data.blog;
    delete data.blog;

    const newCategory = await Category.create(data);
    await ItemBlog.create({ categoryId: newCategory._id, content: blog });
    res.status(StatusCodes.CREATED).json(newCategory);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "populate"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq|ne)\b/g,
      (match) => `$${match}`
    );
    let query = Category.find(JSON.parse(queryStr));

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

    const categories = await query;

    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let query = Category.findById(id);

    if (req.query.populate) {
      query = query.populate(req.query.populate);
    }

    const category = await query;
    const categoryBlog = await ItemBlog.findOne({ categoryId: id });

    res.status(StatusCodes.OK).json({ category, categoryBlog });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = { ...req.body };
    const { id } = req.params;

    const blog = data.blog;
    delete data.blog;

    if (!req.body.parent) req.body.parent = null;
    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });

    await ItemBlog.findOneAndUpdate(
      { categoryId: updatedCategory._id },
      { content: blog }
    );

    res.status(StatusCodes.OK).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json(deletedCategory);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getParentCategory = async (req, res) => {
  try {
    const categories = await Category.find({ parent: null });
    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getchildCategory = async (req, res) => {
  try {
    const categories = await Category.find({ parent: { $ne: null } });
    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getChildCategoryByParentId = async (req, res) => {
  try {
    const { parentId } = req.params;
    const categories = await Category.find({ parent: parentId });
    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getItemCountPerCategory = async (req, res) => {
  try {
    const ItemCountPerCategory = await Product.aggregate([
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
    res.status(StatusCodes.OK).json(ItemCountPerCategory);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
