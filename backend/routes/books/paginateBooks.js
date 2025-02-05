import express from 'express'
import paginate from '../../controllers/books/paginateBooks.js'
const paginateBooks = express.Router()

paginateBooks.get('/paginate', paginate)

export default paginateBooks