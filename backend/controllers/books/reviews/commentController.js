import Review from "../../../models/Review.js";
import Book from "../../../models/Book.js";

export const addComment = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let review = await Review.findOne({ book: bookId });

    if (!review) {
      review = new Review({ book: bookId, comments: [] });
    }

    review.comment.push(comment);

    await review.save();
    res.status(201).json({ message: "Comment added successfully", review });
  } catch (error) {
    next(error);
  }
};
