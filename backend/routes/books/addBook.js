import express from 'express';
import addBook from '../../controllers/books/addBook.js'
const addOneBook = express.Router();

addOneBook.post('/add', addBook)
export default addOneBook;