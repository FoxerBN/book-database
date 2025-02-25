// controllers/reviewController.js

import Review from "../../../models/Review.js";
import Book from "../../../models/Book.js";

export const addLike = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const userIP =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      req.ip;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let review = await Review.findOne({ book: bookId });
    if (!review) {
      review = new Review({
        book: bookId,
        rating: [],
        comment: [],
        likes: 0,
        ratedByIPs: [],
        likedByIPs: [],
      });
    }

    // Toggle logic:
    if (review.likedByIPs.includes(userIP)) {
      review.likedByIPs = review.likedByIPs.filter((ip) => ip !== userIP);
      review.likes = Math.max(0, review.likes - 1);
      await review.save();

      return res.status(200).json({
        message: "Like removed",
        likes: review.likes,
        isLiked: false,
      });
    } else {
      review.likes += 1;
      review.likedByIPs.push(userIP);
      await review.save();

      return res.status(201).json({
        message: "Like added",
        likes: review.likes,
        isLiked: true,
      });
    }
  } catch (error) {
    next(error);
  }
};
