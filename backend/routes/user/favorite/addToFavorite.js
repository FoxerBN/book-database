import express from "express";
import { addToFavourites } from "../../../controllers/user/addToFavorite.js";
import { verifyAccessToken } from "../../../middlewares/auth/verifyToken.js";
const addFavorite = express.Router();

addFavorite.post("/:bookId/favourite", verifyAccessToken,addToFavourites);

export default addFavorite;
