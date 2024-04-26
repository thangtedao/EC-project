import Promotion from "../models/Promotion.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";

export const createPromotion = async (req, res) => {
  try {
    const newPromotion = await Promotion.create(req.body);

    if (
      newPromotion &&
      newPromotion.startDate <= Date.now() &&
      newPromotion.endDate >= Date.now()
    ) {
      if (newPromotion.discountType === "percentage") {
        const discountValue = newPromotion.discountValue / 100;

        await Product.updateMany({ _id: { $in: newPromotion.products } }, [
          {
            $set: {
              pmtPrice: {
                $subtract: ["$price", { $multiply: ["$price", discountValue] }],
              },
            },
          },
        ]);
      } else {
        await Product.updateMany({ _id: { $in: newPromotion.products } }, [
          {
            $set: {
              pmtPrice: {
                $subtract: ["$price", newPromotion.discountValue],
              },
            },
          },
        ]);
      }
    }
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
    const promotion = await Promotion.findById(id).populate({
      path: "products",
      select: ["_id", "name", "price", "salePrice", "pmtPrice", "images"],
    });
    res.status(StatusCodes.OK).json(promotion);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const setPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findById(id);

    if (
      promotion &&
      promotion.startDate <= Date.now() &&
      promotion.endDate >= Date.now()
    ) {
      if (promotion.discountType === "percentage") {
        const discountValue = promotion.discountValue / 100;

        await Product.updateMany({ _id: { $in: promotion.products } }, [
          {
            $set: {
              pmtPrice: {
                $subtract: ["$price", { $multiply: ["$price", discountValue] }],
              },
            },
          },
        ]);
      } else {
        await Product.updateMany({ _id: { $in: promotion.products } }, [
          {
            $set: {
              pmtPrice: {
                $subtract: ["$price", promotion.discountValue],
              },
            },
          },
        ]);
      }
    } else if (promotion && promotion.endDate < Date.now()) {
      await Product.updateMany({ _id: { $in: promotion.products } }, [
        {
          $set: {
            pmtPrice: null,
          },
        },
      ]);
    }
    res.status(StatusCodes.OK).json(promotion);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;

    const oldPromotion = await Promotion.findById(id);

    const updatedPromotion = await Promotion.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (
      updatedPromotion &&
      updatedPromotion.startDate <= Date.now() &&
      updatedPromotion.endDate >= Date.now()
    ) {
      if (updatedPromotion.discountType === "percentage") {
        const discountValue = updatedPromotion.discountValue / 100;

        await Product.updateMany({ _id: { $in: updatedPromotion.products } }, [
          {
            $set: {
              pmtPrice: {
                $subtract: ["$price", { $multiply: ["$price", discountValue] }],
              },
            },
          },
        ]);
      } else {
        await Product.updateMany({ _id: { $in: updatedPromotion.products } }, [
          {
            $set: {
              pmtPrice: {
                $subtract: ["$price", updatedPromotion.discountValue],
              },
            },
          },
        ]);
      }
    }

    // set old to null
    if (oldPromotion) {
      const productIds = oldPromotion.products.filter(
        (item) => !updatedPromotion.products.includes(item)
      );

      await Product.updateMany({ _id: { $in: productIds } }, [
        {
          $set: {
            pmtPrice: null,
          },
        },
      ]);
    }

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
