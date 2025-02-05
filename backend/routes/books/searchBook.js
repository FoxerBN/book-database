import express from 'express'
import searchBooks from '../../controllers/books/searchBook.js'
const searchBook = express.Router();

searchBook.get('/', searchBooks)

export default searchBook