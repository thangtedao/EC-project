import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

export const cloudinaryUploadImage = async (fileToUploads) => {
  await cloudinary.uploader.upload(fileToUploads);
};

export const cloudinaryDeleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

// export const cloudinaryUploadImage = async (fileToUploads) => {
//   const result = await cloudinary.uploader.upload(fileToUploads, {
//     resource_type: "auto",
//   });

//   return {
//     url: result.secure_url,
//     asset_id: result.asset_id,
//     public_id: result.public_id,
//   };
// };

// export const cloudinaryDeleteImage = async (fileToUploads) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.destroy(fileToUploads, (result) => {
//       resolve(
//         {
//           url: result.secure_url,
//           asset_id: result.asset_id,
//           public_id: result.public_id,
//         },
//         {
//           resource_type: "auto",
//         }
//       );
//     });
//   });
// };

// export const cloudinaryUploadImage = async (fileToUploads) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(fileToUploads, (result) => {
//       resolve(
//         {
//           url: result?.secure_url,
//         },
//         {
//           resource_type: "auto",
//         }
//       );
//     });
//   });
// };
