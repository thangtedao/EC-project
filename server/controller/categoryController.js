import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
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
