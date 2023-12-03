import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

export const cloudinaryUploadImage = async (fileToUploads) => {
  const response = await cloudinary.uploader.upload(fileToUploads);
  return response;
};

export const cloudinaryDeleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};
