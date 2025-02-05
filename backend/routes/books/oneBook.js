import express from 'express'
import getOneBook from '../../controllers/books/oneBook.js'
const oneBook = express.Router();

oneBook.get('/one/:id', getOneBook)

export default oneBook