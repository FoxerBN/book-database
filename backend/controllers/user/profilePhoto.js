// controllers/user/profilePhoto.js
import cloudinary from "../../config/cloudinary.js";
import User from "../../models/User.js";

export const uploadProfilePhoto = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const publicId = `profile_photos/${userId}`;
    
    const result = await cloudinary.uploader.upload(dataUri, {
      public_id: publicId, 
      overwrite: true,
      folder: "profile_photos",
      transformation: {
        width: 300,
        height: 300,
        crop: "fill",
        gravity: "auto",
        fetch_format: "auto",
        quality: "auto",
      },
    });

    if (!user.cloudinaryId) {
      user.cloudinaryId = result.public_id;
    }
    user.profilePhoto = result.secure_url;
    const updatedUser = await user.save();

    return res.json({
      message: "Photo uploaded (and replaced) successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.name,
        quote: updatedUser.quote,
        profilePhoto: updatedUser.profilePhoto,
      },
    });
  } catch (error) {
    next(error);
  }
};
