//* SERVER SETTINGS
import express from 'express';
import {connectToMongoDB} from './config/db.js'
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import {detectMaliciousContent} from './middlewares//global/bodySecureCheck.js'
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import passport from 'passport';
import './config/passport.js';
const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config()
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
}));
passport.authenticate('google')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(detectMaliciousContent);
app.use(passport.initialize());
connectToMongoDB()

//*MIDDLEWARES IMPORT
import requestLogger from './middlewares/global/logger.js'
import errorHandler from './middlewares/global/errorHandler.js'
//*BOOK ROUTES IMPORT
import allBook from './routes/books/allBook.js'
import paginateBooks from './routes/books/paginateBooks.js'
import oneBook from './routes/books/oneBook.js';
import searchBook from './routes/books/searchBook.js';
import addOneBook from './routes/books/addBook.js';
import deleteOneBook from './routes/books/deleteOneBook.js';
import reviewsRouter from './routes/books/reviewsRouter.js'
import recommendedBooks from './routes/books/recommendedBooks.js'
//*USER ROUTES IMPORT
import userRouter from './routes/user/userRouter.js';
import googleAuthRouter from './routes/user/googleAuth.js';
import addFavorite from './routes/user/favorite/addToFavorite.js';
import removeFavorite from './routes/user/favorite/removeFromFavorite.js';
import favoriteBooks from './routes/books/favouriteBooks.js';
import removeUser from './routes/user/removeUser.js';
//*USER FRIENDS ROUTES IMPORT
import friendsRouter from './routes/user/friendsRoutes.js';
//* GLOBAL MIDDLEWARES
app.use(requestLogger);

//* ROUTES
app.post("/test", (req, res) => {
    res.json({ sanitizedData: req.body });
});

app.use('/api/books', allBook)
app.use('/api/books',paginateBooks)
app.use('/api/books',oneBook)
app.use('/api/books/search',searchBook)
app.use('/api/books',addOneBook)
app.use('/api/books',deleteOneBook)
app.use('/api/books',reviewsRouter)
app.use('/api/books',recommendedBooks)
app.use('/api/books',favoriteBooks)

app.use('/user',userRouter)
app.use('/auth', googleAuthRouter);
app.use('/user', addFavorite)
app.use('/user', removeFavorite)
app.use('/user', removeUser)

//* USER FRIENDS ROUTES
app.use('/user/friends',friendsRouter)

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
// //* EXPORTING APP FOR TESTING
// export default app;