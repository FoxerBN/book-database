import Review from '../../../models/Review.js';
import Book from '../../../models/Book.js';

export const addComment = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if a review already exists
    let review = await Review.findOne({ book: bookId });

    if (review) {
      review.comment = comment; // Update the existing comment
    } else {
      review = new Review({ book: bookId, comment }); // Create a new review
    }

    await review.save();
    res.status(201).json({ message: 'Comment saved', review });
  } catch (error) {
    next(error);
  }
};
