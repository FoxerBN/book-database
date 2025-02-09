import express from 'express';
import { addLike } from '../../controllers/books/reviews/likeController.js'
import { addComment } from '../../controllers/books/reviews/commentController.js';
import { addRating } from '../../controllers/books/reviews/ratingController.js';
import { commentRateLimiter } from '../../middlewares/commentLimiter.js'
import { verifyCommentMiddleware } from '../../middlewares/verifyComment.js';
const reviewsRouter = express.Router();

reviewsRouter.post('/:bookId/comment',verifyCommentMiddleware,commentRateLimiter, addComment);
reviewsRouter.post('/:bookId/rating', addRating);
reviewsRouter.post('/:bookId/like', addLike);

export default reviewsRouter;