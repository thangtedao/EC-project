import Promotion from "../models/Promotion.js";
import ProductPromotion from "../models/ProductPromotion.js";
import { StatusCodes } from "http-status-codes";

export const createPromotion = async (req, res) => {
  try {
    const newPromotion = await Promotion.create(req.body);

    const newProductPromotion = req.body.products.map((item) => {
      let salePrice = item.price;

      if (newPromotion.discountType === "percentage")
        salePrice =
          item.price - (item.price * newPromotion.discountValue) / 100;
      else if (newPromotion.discountType === "fixed")
        salePrice = item.price - newPromotion.discountValue;

      return {
        productId: item._id,
        promotionId: newPromotion._id,
        salePrice: salePrice,
      };
    });
    await ProductPromotion.insertMany(newProductPromotion);
    res.status(StatusCodes.CREATED).json(newPromotion);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(StatusCodes.OK).json(promotions);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getPromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findById(id);
    const productPromotion = await ProductPromotion.find({ promotionId: id });
    res.status(StatusCodes.OK).json(promotion, productPromotion);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPromotion = await Promotion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json(updatedPromotion);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPromotion = await Promotion.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json(deletedPromotion);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
