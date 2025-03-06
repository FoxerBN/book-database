
import express from "express";
import multer from "multer";
import { uploadProfilePhoto } from "../../controllers/user/profilePhoto.js";
import { verifyAccessToken } from "../../middlewares/auth/verifyToken.js";

const uploadPhoto = express.Router();

// Memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadPhoto.post("/photo", verifyAccessToken, upload.single("photo"), uploadProfilePhoto);

export default uploadPhoto;
