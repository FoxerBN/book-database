import express from 'express';
import getRecommendedBooks from '../../controllers/books/recommendedBooks.js'

const recommendedBooks = express.Router()

recommendedBooks.get('/recommended', getRecommendedBooks)

export default recommendedBooks;