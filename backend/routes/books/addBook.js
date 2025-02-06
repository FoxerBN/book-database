import express from 'express';
import addBook from '../../controllers/books/addBook.js'
import { validateAddBook } from '../../middlewares/bookAddValidation.js';
const addOneBook = express.Router();

addOneBook.post('/add', validateAddBook,addBook)
export default addOneBook;