import Product from "../models/Product.js";
import ProductVariation from "../models/ProductVariation.js";
import ProductAttribute from "../models/ProductAttribute.js";
import ItemBlog from "../models/ItemBlog.js";
import slugify from "slugify";
import { NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/uploadImages.js";
import { StatusCodes } from "http-status-codes";
import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    let images = [];
    let publicIdImages = [];
    if (data.merelink) {
      images = data.merelink?.split(",");
      delete data.merelink;
    } else delete data.merelink;

    req.file?.images?.map(async (image) => {
      const fileFormat = formatImage(image);
      const response = await cloudinaryUploadImage(fileFormat);

      images.push(response.secure_url);
      publicIdImages.push(response.public_id);
    });

    let variations = data.variations;
    let attributes = data.attributes;
    const blog = data.blog;
    delete data.blog;
    delete data.variations;
    delete data.attributes;
    data.images = images;
    data.publicIdImages = publicIdImages;
    data.slug = slugify(data.name);
    data.category = data.category.split(",");
    data.oldSalePrice = data.salePrice;

    const newProduct = await Product.create(data);
    await ItemBlog.create({ productId: newProduct._id, content: blog });

    if (variations && Array.isArray(variations)) {
      variations = variations.map((item) => {
        return {
          productId: newProduct._id,
          variationName: item.variationName,
          variationValue: item.variationValue,
          price: item.price && item.price,
          price: item.salePrice && item.salePrice,
        };
      });
      await ProductVariation.insertMany(variations);
    }

    if (attributes && Array.isArray(attributes)) {
      attributes = attributes.map((item) => {
        return {
          productId: newProduct._id,
          attributeName: item.attributeName,
          attributeValue: item.attributeValue,
          mainAttribute: item.mainAttribute,
        };
      });
      await ProductAttribute.insertMany(attributes);
    }

    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "populate"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq|ne)\b/g,
      (match) => `$${match}`
    );
    let query = Product.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    if (req.query.populate) {
      const item = req.query.populate.split(",").join(" ");
      query = query.populate(item);
    }

    if (req.query.page) {
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: `This page does not exists` });
      }
    }

    const products = await query;
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // If not admin, increase 1 view for this product
    if (req.user && req.user.role === "admin") {
      // Do Nothing
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        $inc: { viewed: 1 },
      });
      if (!updatedProduct) throw new NotFoundError(`Product Not Found`);
    }

    let query = Product.findById(id);

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    const product = await query;

    let variation = await ProductVariation.find({ productId: id });
    let attribute = await ProductAttribute.find({ productId: id });

    const productBlog = await ItemBlog.findOne({ productId: id });

    // if (variation) {
    //   variation = variation.reduce((groups, item) => {
    //     const { variationName } = item;
    //     if (!groups[variationName]) {
    //       groups[variationName] = [];
    //     }
    //     groups[variationName].push(item);
    //     return groups;
    //   }, {});
    // }

    res
      .status(StatusCodes.OK)
      .json({ product, attribute, variation, productBlog });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const filterProduct = async (req, res) => {
  try {
    let queryObj = { ...req.query };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "category",
      "minPrice",
      "maxPrice",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    queryObj = Object.fromEntries(
      Object.entries(queryObj).filter(([key, value]) => value !== "")
    );
    const isEmpty = Object.keys(queryObj).length === 0;

    const filterAttributes = [];

    if (!isEmpty) {
      for (const key in queryObj) {
        filterAttributes.push({
          attributeName: new RegExp(key.replace(" ", "."), "i"),
          attributeValue: new RegExp(queryObj[key].replace(" ", "."), "i"),
        });
      }
    }

    const aggregationStages = [];

    // Match category
    aggregationStages.push({
      $match: {
        category: {
          $elemMatch: {
            $eq: new mongoose.Types.ObjectId(req.query.category),
          },
        },
      },
    });

    // Match price
    if (req.query.minPrice && req.query.maxPrice) {
      const minPrice = parseInt(req.query.minPrice);
      const maxPrice = parseInt(req.query.maxPrice);
      aggregationStages.push({
        $match: {
          salePrice: {
            $gte: minPrice,
            $lte: maxPrice,
          },
        },
      });
    }

    if (!isEmpty) {
      // Lookup attributes
      aggregationStages.push({
        $lookup: {
          from: "productattributes",
          localField: "_id",
          foreignField: "productId",
          as: "attributes",
        },
      });

      // Match products based on attributes
      aggregationStages.push({
        $match: {
          attributes: {
            $all: filterAttributes.map((attr) => ({
              $elemMatch: attr,
            })),
          },
        },
      });
    }

    // Select fields
    aggregationStages.push({
      $project: {
        _id: 1,
        name: 1,
        price: 1,
        salePrice: 1,
        images: 1,
      },
    });

    const page = 1;
    const limit = 30;
    const skip = (page - 1) * limit;

    let products;
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      products = await Product.aggregate(aggregationStages)
        .skip(skip)
        .limit(limit)
        .sort(sortBy);
    } else {
      products = await Product.aggregate(aggregationStages)
        .skip(skip)
        .limit(limit)
        .sort("-createdAt");
    }

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getRelateModelProduct = async (req, res) => {
  try {
    const { model } = req.params;

    const relateModel = await Product.aggregate([
      {
        $match: {
          model: model,
        },
      },
      {
        $lookup: {
          from: "productattributes",
          localField: "_id",
          foreignField: "productId",
          as: "attribute",
        },
      },
    ]);

    res.status(StatusCodes.OK).json(relateModel);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    let images = [];
    let publicIdImages = [];
    if (data.merelink) {
      images = data.merelink?.split(",");
      delete data.merelink;
    } else delete data.merelink;

    req.file?.images?.map(async (image) => {
      const fileFormat = formatImage(image);
      const response = await cloudinaryUploadImage(fileFormat);

      images.push(response.secure_url);
      publicIdImages.push(response.public_id);
    });

    let variations = data.variations;
    let attributes = data.attributes;
    const blog = data.blog;
    delete data.blog;
    delete data.variations;
    delete data.attributes;
    data.images = images;
    data.publicIdImages = publicIdImages;
    data.slug = slugify(data.name);
    data.category = data.category.split(",");
    data.oldSalePrice = data.salePrice;

    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, data);
    if (!updatedProduct) throw new NotFoundError(`Product Not Found`);

    await ItemBlog.findOneAndUpdate(
      { productId: updatedProduct._id },
      { content: blog },
      { upsert: true }
    );

    if (variations && Array.isArray(variations)) {
      variations = variations.map((item) => {
        return {
          productId: updatedProduct._id,
          variationName: item.variationName,
          variationValue: item.variationValue,
          priceModifier: item.priceModifier,
        };
      });
      await ProductVariation.deleteMany({ productId: updatedProduct._id });
      await ProductVariation.insertMany(variations);
    } else await ProductVariation.deleteMany({ productId: updatedProduct._id });

    if (attributes && Array.isArray(attributes)) {
      attributes = attributes.map((item) => {
        return {
          productId: updatedProduct._id,
          attributeName: item.attributeName,
          attributeValue: item.attributeValue,
          mainAttribute: item.mainAttribute,
        };
      });
      await ProductAttribute.deleteMany({ productId: updatedProduct._id });
      await ProductAttribute.insertMany(attributes);
    } else await ProductAttribute.deleteMany({ productId: updatedProduct._id });

    if (req.files && updatedProduct.publicIdImages.length > 0) {
      await Promise.all(
        updatedProduct.publicIdImages.map(async (id) => {
          await cloudinaryDeleteImage(id);
        })
      );
    }

    // const products = await Product.find({ pid: { $exists: false } }).sort({
    //   _id: 1,
    // });
    // let count = 1;
    // for (const product of products) {
    //   await Product.findByIdAndUpdate(product._id, { $set: { pid: count } });
    //   count++;
    // }

    // await Product.updateMany(
    //   { pid: { $exists: true } },
    //   { $unset: { pid: "" } }
    // );

    res.status(StatusCodes.OK).json({ msg: "Product's Updated" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) throw new NotFoundError(`Product Not Found`);
    res.status(StatusCodes.OK).json({ msg: "Product's Deleted" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    if (req.query.name) {
      const queryObj = { ...req.query };
      const excludeFields = [
        "page",
        "sort",
        "limit",
        "fields",
        "populate",
        "name",
      ];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt|eq|ne)\b/g,
        (match) => `$${match}`
      );

      let query = Product.find({
        name: { $regex: req.query.name, $options: "i" },
        ...JSON.parse(queryStr),
      });

      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      if (req.query.limit) {
        query = query.limit(req.query.limit);
      }

      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      }

      if (req.query.populate) {
        const item = req.query.populate.split(",").join(" ");
        query = query.populate(item);
      }

      if (req.query.page) {
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        const productCount = await Product.countDocuments();
        if (skip >= productCount) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: `This page does not exists` });
        }
      }

      const products = await query;
      res.status(StatusCodes.OK).json(products);
    }
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getRecommendProducts = async (req, res) => {
  try {
    const { productIdList } = req.body;
    let productIds = req.body.productIdList || []; // Lấy mảng các id sản phẩm từ request body, không có thì về rỗng
    let products;
    if (productIds.length > 0) {
      products = await Product.find({ pid: { $in: productIds } });
    } else {
      products = await Product.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};