import Product from "../models/Product.js";
import ProductVariation from "../models/ProductVariation.js";
import ProductBlog from "../models/ProductBlog.js";
import Review from "../models/Review.js";
import slugify from "slugify";
import { NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/uploadImages.js";
import { StatusCodes } from "http-status-codes";
import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";

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
    const blog = data.blog;
    delete data.blog;
    delete data.variations;
    data.images = images;
    data.publicIdImages = publicIdImages;
    data.slug = slugify(data.name);
    data.category = data.category.split(",");

    const newProduct = await Product.create(data);
    await ProductBlog.create({ productId: newProduct._id, content: blog });

    if (variations) {
      variations = variations.map((item) => {
        return {
          productId: newProduct._id,
          variationName: item.variationName,
          variationValue: item.variationValue,
          priceModifier: item.priceModifier,
        };
      });
      await ProductVariation.insertMany(variations);
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

    const products = await query;
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    if (req.query.category) {
      let query = Product.find({ category: { $in: req.query.category } });

      if (req.query.parent) {
        query = Product.find({
          category: { $all: [req.query.category, req.query.parent] },
        });
      }

      if (req.query.status === "available") {
        query.where("status").equals("Sẵn Hàng");
      }

      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount)
          throw new NotFoundError(`This page does not exists`);
      }

      const products = await query;
      res.status(200).json(products);
    } else {
      res.status(200).json({ products: [] });
    }
  } catch (error) {
    res.status(409).json({ msg: error.message });
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

    // if (req.query.populate && req.query.populate === "ratings.postedby") {
    //   query = query.populate({
    //     path: "ratings.postedby",
    //     select: ["fullName", "avatar"],
    //   });
    // }

    const product = await query;

    let variation = await ProductVariation.find({ productId: id });

    const productBlog = await ProductBlog.findOne({ productId: id });
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

    res.status(StatusCodes.OK).json({ product, variation, productBlog });
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
    const blog = data.blog;
    delete data.blog;
    delete data.variations;
    data.images = images;
    data.publicIdImages = publicIdImages;
    data.slug = slugify(data.name);
    data.category = data.category.split(",");

    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, data);
    if (!updatedProduct) throw new NotFoundError(`Product Not Found`);

    await ProductBlog.findOneAndUpdate(
      { productId: updatedProduct._id },
      { content: blog }
    );

    if (variations) {
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

    if (req.files && updatedProduct.publicIdImages.length > 0) {
      await Promise.all(
        updatedProduct.publicIdImages.map(async (id) => {
          await cloudinaryDeleteImage(id);
        })
      );
    }

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
      let query = Product.find({
        name: { $regex: req.query.name, $options: "i" },
      });

      query = query.sort("-createdAt");
      query = query.limit(10);

      const products = await query;
      res.status(StatusCodes.OK).json(products);
    }
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const rating = async (req, res) => {
  try {
    const { userId } = req.user;
    const { rating, productId, content } = req.body;

    const review = await Review.create({
      productId,
      userId,
      rating,
      content,
    });

    // const product = await Product.findById(productId);
    // let alreadyRated = product.ratings.find(
    //   (item) => item.postedby.toString() === userId.toString()
    // );
    // if (alreadyRated) {
    //   await Product.updateOne(
    //     {
    //       ratings: { $elemMatch: alreadyRated },
    //     },
    //     {
    //       $set: {
    //         "ratings.$.star": star,
    //         "ratings.$.comment": comment,
    //         "ratings.$.createdAt": timeStamp(),
    //       },
    //     },
    //     { new: true }
    //   );
    // } else {
    //   await Product.findByIdAndUpdate(
    //     productId,
    //     {
    //       $push: {
    //         ratings: {
    //           star: star,
    //           comment: comment,
    //           postedby: userId,
    //         },
    //       },
    //     },
    //     { new: true }
    //   );
    // }
    // const getAllRatings = await Product.findById(productId);
    // let totalRating = getAllRatings.ratings.length;
    // let ratingSum = getAllRatings.ratings
    //   .map((item) => item.star)
    //   .reduce((prev, curr) => prev + curr, 0);
    // let actualRating = Math.round(ratingSum / totalRating);
    // let finalProduct = await Product.findByIdAndUpdate(
    //   productId,
    //   {
    //     totalRating: actualRating,
    //   },
    //   { new: true }
    // );

    res.status(StatusCodes.OK).json(review);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};
