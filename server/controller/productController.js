import { json } from "express";
import { NotFoundError } from "../errors/customErrors.js";
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    // FILTERING
    // ex: localhost:..../product/?price=9999&brand=Apple
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    // filter price (gte = greater than or equal, .....)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // ex: local..../product/?price[gte]=9999&price[lt]=12000
    let query = Product.find(JSON.parse(queryStr));

    // SORTING
    // ex: local..../product/?sort=category,-brand (sort theo chữ cái đầu, dấu - là sort ngược)
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // LIMITING THE FIELDS
    // chức năng chọn lọc của mongodb
    // ex: local..../product/?fields=title,price
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // PAGINATION
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount)
        throw new NotFoundError(`This page does not exists`);
    }

    const products = await query;
    res.status(200).json({ products });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) throw new NotFoundError(`no product with id ${id}`);
    res.status(200).json({ product });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) throw new NotFoundError(`no product with id ${id}`);
    res.status(200).json({ updatedProduct });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) throw new NotFoundError(`no product with id ${id}`);
    res.status(200).json({ deletedProduct });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getRelatedProduct = async (req, res) => {
  try {
    const { category, brand } = req.params;
    const products = await Product.find({ category: category, brand: brand });
    if (products.length > 8) {
      products.shuffle();
      const relatedProducts = products.slice(0, 8);
      res.status(200).json({ relatedProducts });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
