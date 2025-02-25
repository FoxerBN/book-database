import express from 'express';
import favBooks  from '../../controllers/books/favoriteBooks.js'
import { verifyAccessToken } from '../../middlewares/auth/verifyToken.js';
const favoriteBooks = express.Router();

favoriteBooks.get('/favorites', verifyAccessToken, favBooks)

export default favoriteBooks;