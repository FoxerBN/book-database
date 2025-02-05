import Review from '../../../models/Review.js';
import Book from '../../../models/Book.js';

export const addRating = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if a review already exists
    let review = await Review.findOne({ book: bookId });

    if (review) {
      review.rating = rating; // Update the existing rating
    } else {
      review = new Review({ book: bookId, rating }); // Create a new review
    }

    await review.save();

    res.status(201).json({ message: 'Rating saved', review });
  } catch (error) {
    next(error);
  }
};
