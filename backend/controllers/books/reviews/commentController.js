import Review from "../../../models/Review.js";
import Book from "../../../models/Book.js";

export const addComment = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let review = await Review.findOne({ book: bookId });

    if (review) {
      review.comment = comment;
    } else {
      review = new Review({ book: bookId, comment });
    }

    await review.save();
    res.status(201).json({ message: "Comment saved", review });
  } catch (error) {
    next(error);
  }
};
