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
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!job) throw new NotFoundError(`no product with id ${id}`);
    res.status(200).json({ product });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
