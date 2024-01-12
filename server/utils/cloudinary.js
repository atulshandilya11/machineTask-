const cloudinary = require('cloudinary');
const fs = require('fs');
require('dotenv').config();
console.log(`cloud`, process.env.CLOUD_NAME);

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log(`cloud`, localFilePath);
    if (!localFilePath) return null;

    const response = await cloudinary.v2.uploader.upload(
      localFilePath
    );

    console.log(`file is uploaded on cloudinary`, response);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
module.exports = uploadOnCloudinary;
