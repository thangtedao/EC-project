import Product from "../models/Product.js";
import slugify from "slugify";
import { NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/uploadImages.js";
import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    data.category2 = data.category2.split(",");
    data.category = [data.category1, ...data.category2];
    delete data.category1;
    delete data.category2;

    let images = [];
    let publicIdImages = [];
    if (data.images !== "") images = data.images.split(",");
    if (req.files) {
      const files = ["image1", "image2", "image3", "image4"];

      await Promise.all(
        files.map(async (fieldName) => {
          if (req.files[fieldName]) {
            const file = req.files[fieldName][0];

            const fileFormat = formatImage(file);
            const response = await cloudinaryUploadImage(fileFormat);

            images.push(response.secure_url);
            publicIdImages.push(response.public_id);
          }
        })
      );
    }
    data.images = images;
    data.publicIdImages = publicIdImages;

    data.slug = slugify(data.name);
    const newProduct = await Product.create(data);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
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
    const excludeFields = ["page", "sort", "limit", "fields", "status"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    if (req.query.status === "available") {
      query.where("status").equals("Sẵn Hàng");
    }

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
    const updatedProduct = await Product.updateOne(
      { slug: slug },
      { $inc: { viewed: 1 } }
    );
    if (updatedProduct.modifiedCount === 0)
      throw new NotFoundError(`no product`);

    let query = Product.findOne({ slug: slug });

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    if (req.query.populate && req.query.populate === "ratings.postedby") {
      query = query.populate({
        path: "ratings.postedby",
        select: ["fullName", "avatar"],
      });
    }

    const product = await query;

    res.status(200).json({ product });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    data.category2 = data.category2.split(",");
    data.category = [data.category1, ...data.category2];
    delete data.category1;
    delete data.category2;

    let images = [];
    let publicIdImages = [];
    if (data.images !== "") images = data.images.split(",");
    if (req.files) {
      const files = ["image1", "image2", "image3", "image4"];

      await Promise.all(
        files.map(async (fieldName) => {
          if (req.files[fieldName]) {
            const file = req.files[fieldName][0];

            const fileFormat = formatImage(file);
            const response = await cloudinaryUploadImage(fileFormat);

            images.push(response.secure_url);
            publicIdImages.push(response.public_id);
          }
        })
      );
    }
    data.images = images;
    data.publicIdImages = publicIdImages;

    const { slug } = req.params;
    const updatedProduct = await Product.findOneAndUpdate({ slug: slug }, data);
    if (!updatedProduct) throw new NotFoundError(`product does not exists`);

    if (req.files && updatedProduct.publicIdImages.length > 0) {
      await Promise.all(
        updatedProduct.publicIdImages.map(async (id) => {
          await cloudinaryDeleteImage(id);
        })
      );
    }

    res.status(200).json({ msg: "updated" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) throw new NotFoundError(`product does not exists`);
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ msg: error.message });
  }
};

export const rating = async (req, res) => {
  try {
    const { userId } = req.user;

    const { star, productId, comment } = req.body;
    const product = await Product.findById(productId);
    let alreadyRated = product.ratings.find(
      (item) => item.postedby.toString() === userId.toString()
    );
    if (alreadyRated) {
      await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: userId,
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
    console.log(error);
    res.status(409).json({ msg: error.message });
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
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
