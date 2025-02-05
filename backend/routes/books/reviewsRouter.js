import express from 'express';
import { addLike } from '../../controllers/books/reviews/likeController.js'
import { addComment } from '../../controllers/books/reviews/commentController.js';
import { addRating } from '../../controllers/books/reviews/ratingController.js';

const reviewsRouter = express.Router();

reviewsRouter.post('/:bookId/comment', addComment);
reviewsRouter.post('/:bookId/rating', addRating);
reviewsRouter.post('/:bookId/like', addLike);

export default reviewsRouter;