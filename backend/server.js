//* SERVER SETTINGS
import express from 'express';
import {connectToMongoDB} from './config/db.js'
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectToMongoDB()

//*MIDDLEWARES IMPORT
import requestLogger from './middlewares/logger.js'
import errorHandler from './middlewares/errorHandler.js'
//* ROUTES IMPORT
import allBook from './routes/books/allBook.js'
import paginateBooks from './routes/books/paginateBooks.js'
import oneBook from './routes/books/oneBook.js';
import searchBook from './routes/books/searchBook.js';
//* GLOBAL MIDDLEWARES
app.use(requestLogger);

//* ROUTES
app.get('/', (req,res)=>{
    res.send('Hello from Next.js API!')
})
app.use('/api/books', allBook)
app.use('/api/books',paginateBooks)
app.use('/api/books',oneBook)
app.use('/api/books/search',searchBook)


app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// //* EXPORTING APP FOR TESTING
// export default app;