import Color from "../models/Color.js";

export const createColor = async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.status(201).json(newColor);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getAllColor = async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).json({ colors });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedColor });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedColor = await Color.findByIdAndDelete(id);
    res.status(200).json({ deletedColor });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
