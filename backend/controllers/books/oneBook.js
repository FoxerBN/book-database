import mongoose from 'mongoose';
import Book from '../../models/Book.js';
import Review from '../../models/Review.js';

const getOneBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book ID!' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found!' });
    }

    // Query for the aggregated review for this book
    const review = await Review.findOne({ book: id }).select('rating comment likes createdAt');

    // Attach review data as an array so the front-end can use it as before
    res.status(200).json({ book: { ...book.toObject(), reviews: review ? [review] : [] } });
  } catch (error) {
    next(error);
  }
};

export default getOneBook;
