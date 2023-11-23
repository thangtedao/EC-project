import { NotFoundError } from "../errors/customErrors.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import fs from "fs";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const uploadImages = async (req, res) => {
  try {
    const { id } = req.params;
    const uploader = (path) => cloudinaryUploadImage(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: images,
      },
      { new: true }
    );
    res.status(201).json(images);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteImages = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = cloudinaryDeleteImage(id, "images");
    res.status(201).json({ msg: "Deleted" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

// export const getAllProduct = async (req, res) => {
//   try {
//     // FILTERING
//     // ex: localhost:..../product/?price=9999&brand=Apple
//     const queryObj = { ...req.query };
//     const excludeFields = ["page", "sort", "limit", "fields"];
//     excludeFields.forEach((el) => delete queryObj[el]);
//     let queryStr = JSON.stringify(queryObj);
//     // filter price (gte = greater than or equal, .....)
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//     // ex: local..../product/?price[gte]=9999&price[lt]=12000
//     let query = Product.find(JSON.parse(queryStr));

//     // SORTING
//     // ex: local..../product/?sort=category,-brand (sort theo chữ cái đầu, dấu - là sort ngược)
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // LIMITING THE FIELDS
//     // chức năng chọn lọc của mongodb
//     // ex: local..../product/?fields=title,price
//     if (req.query.fields) {
//       const fields = req.query.fields.split(",").join(" ");
//       query = query.select(fields);
//     } else {
//       query = query.select("-__v");
//     }

//     // PAGINATION
//     const page = req.query.page;
//     const limit = req.query.limit;
//     const skip = (page - 1) * limit;
//     query = query.skip(skip).limit(limit);
//     if (req.query.page) {
//       const productCount = await Product.countDocuments();
//       if (skip >= productCount)
//         throw new NotFoundError(`This page does not exists`);
//     }

//     const products = await query;
//     res.status(200).json({ products });
//   } catch (error) {
//     res.status(409).json({ msg: error.message });
//   }
// };

export const getAllProduct = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
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

    const products = await query;
    res.status(200).json({ products });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    if (req.query.category) {
      const categories = req.query.category.split(",");

      let query = Product.find({ category: { $all: categories } });

      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        console.log(sortBy);
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
      res.status(200).json({ products });
    } else {
      res.status(200).json({ products: [] });
    }
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    // const product = await Product.findOne({ slug: slug });
    const product = await Product.findOneAndUpdate(
      { slug: slug },
      { $inc: { viewed: 1 } },
      { new: true }
    );
    if (!product) throw new NotFoundError(`no product`);
    res.status(200).json({ product });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: slug },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) throw new NotFoundError(`no product ${slug}`);
    res.status(200).json({ updatedProduct });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) throw new NotFoundError(`no product with id ${id}`);
    res.status(200).json({ deletedProduct });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getRelatedProduct = async (req, res) => {
  try {
    const products = await Product.find({
      $all: { category: req.query.category },
      limit: 10,
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === productId
    );
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.status(200).json({ user });
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const rating = async (req, res) => {
  try {
    const { _id } = req.user;
    const { star, productId, comment } = req.body;
    const product = await Product.findById(productId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
    }
    const getAllRatings = await Product.findById(productId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      productId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );

    res.status(200).json(finalProduct);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

// 6:13:12
