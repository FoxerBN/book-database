import express from 'express';
import deleteBook from '../../controllers/books/deleteBook.js'
const deleteOneBook = express.Router();

deleteOneBook.delete('/delete/:id', deleteBook)
export default deleteOneBook;