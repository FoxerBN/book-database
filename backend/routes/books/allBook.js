import express from 'express'
import getAllBooks from '../../controllers/books/allBooks.js'
const allBook = express.Router()

allBook.get('/all', getAllBooks)

export default allBook