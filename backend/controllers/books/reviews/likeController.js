import Review from '../../../models/Review.js';

export const addLike = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const review = await Review.findOneAndUpdate(
      { book: bookId },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found for this book' });
    }

    res.status(200).json({ message: 'Like added', likes: review.likes });
  } catch (error) {
    next(error);
  }
};
