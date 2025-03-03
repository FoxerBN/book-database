import mongoose from 'mongoose';
import Book from '../../models/Book.js';
import Review from '../../models/Review.js';

const getOneBook = async (req, res, next) => {
  try {
    const userIP =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      req.ip;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book ID!' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found!' });
    }

    const review = await Review.findOne({ book: id }).select('rating comment likes likedByIPs createdAt');

    res.status(200).json({ip:userIP, book: { ...book.toObject(), reviews: review ? [review] : [] } });
  } catch (error) {
    next(error);
  }
};

export default getOneBook;
