import Review from "../../../models/Review.js";
import Book from "../../../models/Book.js";
export const addRating = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;
    const userIP =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let review = await Review.findOne({ book: bookId });

    if (!review) {
      review = new Review({ 
        book: bookId, 
        rating: [rating], 
        comment: [],
        likes: 0,
        ratedByIPs: [userIP]
      });
    } else {
      if (review.ratedByIPs.includes(userIP)) {
        return res
          .status(400)
          .json({ message: "You have already rated this book" });
      }
      review.rating.push(rating);
      review.ratedByIPs.push(userIP);
    }

    await review.save();

    const avgRating =
      review.rating.reduce((acc, val) => acc + val, 0) / review.rating.length;

    res.status(201).json({ message: "Rating saved", review, averageRating: avgRating });
  } catch (error) {
    next(error);
  }
};
