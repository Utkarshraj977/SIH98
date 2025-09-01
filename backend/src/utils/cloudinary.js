import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // ✅ Absolute path bana lo (safe delete ke liye)
    const absolutePath = path.resolve(localFilePath);

    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });

    console.log("🟢 File uploaded: ", response.secure_url);

    // ✅ Delete after upload
    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error("⚠️ File delete error:", err.message);
      } else {
        console.log("🗑️ Temp file deleted:", absolutePath);
      }
    });

    return response;
  } catch (error) {
    console.error("🔴 Cloudinary upload error:", error.message);

    // Error aaya to bhi file delete karo
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlink(localFilePath, (err) => {
        if (err) console.error("⚠️ File delete error:", err.message);
      });
    }

    return null;
  }
};

export { uploadOnCloudinary };
