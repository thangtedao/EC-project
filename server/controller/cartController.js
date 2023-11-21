import Cart from "../models/Cart.js";
import slugify from "slugify";

export const createCart = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const newCart = await Cart.create(req.body);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getAllCart = async (req, res) => {
  try {
    const categories = await Cart.find(req.query);
    res.status(200).json({ categories });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getSingleCart = async (req, res) => {
  try {
    const { id } = req.params;
    const Cart = await Cart.findById(id);
    res.status(200).json({ Cart });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedCart });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCart = await Cart.findByIdAndDelete(id);
    res.status(200).json({ deletedCart });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getParentCart = async (req, res) => {
  try {
    const categories = await Cart.find({ parent: null });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getChildCart = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Cart.find({ parent: id });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
