import express from "express";
import { removeFromFavourites } from "../../../controllers/user/removeFromFavorites.js";
import { verifyAccessToken } from "../../../middlewares/auth/verifyToken.js";
const removeFavorite = express.Router();

removeFavorite.delete("/:bookId/deletefavourite", verifyAccessToken,removeFromFavourites);

export default removeFavorite;
