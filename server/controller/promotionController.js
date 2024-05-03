import Promotion from "../models/Promotion.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";

export const createPromotion = async (req, res) => {
  try {
    const newPromotion = await Promotion.create(req.body);

    // trong gđ evt chưa active thì active
    if (
      newPromotion &&
      newPromotion.startDate <= Date.now() &&
      newPromotion.endDate >= Date.now() &&
      !newPromotion.isActive
    ) {
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

        await Promotion.findByIdAndUpdate(newPromotion._id, {
          $set: { isActive: true },
        });
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

        await Promotion.findByIdAndUpdate(newPromotion._id, {
          $set: { isActive: true },
        });
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
    if (req.query.admin) {
      const promotions = await Promotion.find();
      return res.status(StatusCodes.OK).json(promotions);
    }

    const promotions = await Promotion.find({
      $or: [
        {
          startDate: {
            $gte: Date.now(),
            $lte: Date.now() + 5 * 24 * 60 * 60 * 1000,
          },
        },
        {
          startDate: { $lt: Date.now() },
          endDate: { $gt: Date.now() },
        },
      ],
    }).populate({
      path: "products",
      select: ["_id", "name", "price", "salePrice", "images"],
    });

    // set price promotion temp
    promotions.forEach((item) => {
      item.products.forEach((product) => {
        product.salePrice = (
          product.price -
          (product.price * item.discountValue) / 100
        ).toFixed(0);
      });
    });

    res.status(StatusCodes.OK).json(promotions);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getPromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findById(id);
    res.status(StatusCodes.OK).json(promotion);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const setPromotion = async (req, res) => {
  try {
    const promotions = await Promotion.find();

    promotions.forEach(async (promotion) => {
      if (
        promotion &&
        promotion.startDate <= Date.now() &&
        promotion.endDate >= Date.now() &&
        !promotion.isActive
      ) {
        if (promotion.discountType === "percentage") {
          const discountValue = promotion.discountValue / 100;
          await Product.updateMany({ _id: { $in: promotion.products } }, [
            {
              $set: {
                salePrice: {
                  $subtract: [
                    "$price",
                    { $multiply: ["$price", discountValue] },
                  ],
                },
              },
            },
          ]);

          await Promotion.findByIdAndUpdate(promotion._id, {
            $set: { isActive: true },
          });
        } else {
          await Product.updateMany({ _id: { $in: promotion.products } }, [
            {
              $set: {
                salePrice: {
                  $subtract: ["$price", promotion.discountValue],
                },
              },
            },
          ]);
        }

        await Promotion.findByIdAndUpdate(promotion._id, {
          $set: { isActive: true },
        });
      } else if (
        promotion &&
        promotion.endDate < Date.now() &&
        promotion.isActive
      ) {
        await Promotion.findByIdAndUpdate(promotion._id, {
          $set: { isActive: false },
        });

        await Product.updateMany({ _id: { $in: promotion.products } }, [
          {
            $set: {
              salePrice: "$oldSalePrice",
            },
          },
        ]);
      }
    });

    res.status(StatusCodes.OK).json();
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
      updatedPromotion.endDate >= Date.now() &&
      !updatedPromotion.isActive
    ) {
      if (updatedPromotion.discountType === "percentage") {
        const discountValue = updatedPromotion.discountValue / 100;

        await Product.updateMany({ _id: { $in: updatedPromotion.products } }, [
          {
            $set: {
              salePrice: {
                $subtract: ["$price", { $multiply: ["$price", discountValue] }],
              },
            },
          },
        ]);
      } else {
        await Product.updateMany({ _id: { $in: updatedPromotion.products } }, [
          {
            $set: {
              salePrice: {
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

      // await Product.updateMany({ _id: { $in: productIds } }, [
      //   {
      //     $set: {
      //       salePrice: null,
      //     },
      //   },
      // ]);

      await Product.updateMany({ _id: { $in: productIds } }, [
        {
          $set: {
            salePrice: "$oldSalePrice",
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
