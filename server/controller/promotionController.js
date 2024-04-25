import Promotion from "../models/Promotion.js";
import Product from "../models/Product.js";
import ProductPromotion from "../models/ProductPromotion.js";
import { StatusCodes } from "http-status-codes";

export const createPromotion = async (req, res) => {
  try {
    // const newPromotion = await Promotion.create(req.body);
    const newPromotion = await Promotion.findById("662a15cd15b0003e897749d6");

    if (newPromotion) {
      if (newPromotion.discountType === "percentage") {
        const discountValue = newPromotion.discountValue / 100;

        await Product.updateMany({ _id: { $in: newPromotion.products } }, [
          {
            $set: {
              salePrice: {
                $subtract: ["$price", { $multiply: ["$price", discountValue] }],
              },
            },
          },
        ]);
      } else {
        await Product.updateMany({ _id: { $in: newPromotion.products } }, [
          {
            $set: {
              salePrice: {
                $subtract: ["$price", newPromotion.discountValue],
              },
            },
          },
        ]);
      }
    }

    // const newProductPromotion = req.body.products.map((item) => {
    //   let salePrice = item.price;

    //   if (newPromotion.discountType === "percentage")
    //     salePrice =
    //       item.price - (item.price * newPromotion.discountValue) / 100;
    //   else if (newPromotion.discountType === "fixed")
    //     salePrice = item.price - newPromotion.discountValue;

    //   return {
    //     productId: item._id,
    //     promotionId: newPromotion._id,
    //     salePrice: salePrice,
    //   };
    // });
    // await ProductPromotion.insertMany(newProductPromotion);
    res.status(StatusCodes.CREATED).json(newPromotion);
  } catch (error) {
    console.log(error);
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
    const promotion = await Promotion.findById(id).populate("products");
    res.status(StatusCodes.OK).json(promotion);
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
