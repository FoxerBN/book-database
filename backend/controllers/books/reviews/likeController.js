import Review from "../../../models/Review.js";
import Book from "../../../models/Book.js";

export const addLike = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const userIP =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    let review = await Review.findOne({ book: bookId });

    if (!review) {
      review = new Review({
        book: bookId,
        rating: null,
        comment: "",
        likes: 0,
        likedByIPs: [],
      });
    }

    if (review.likedByIPs.includes(userIP)) {
      return res
        .status(400)
        .json({ message: "You have already liked this review" });
    }

    review.likes += 1;
    review.likedByIPs.push(userIP);

    await review.save();

    res.status(201).json({ message: "Like added", likes: review.likes });
  } catch (error) {
    next(error);
  }
};
