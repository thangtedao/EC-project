import Brand from "../models/Brand.js";

export const createBrand = async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getAllBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ brands });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedBrand });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.status(200).json({ deletedBrand });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
