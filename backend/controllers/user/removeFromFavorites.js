
import User from "../../models/User.js";

export const removeFromFavourites = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { bookId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favourites.includes(bookId)) {
      return res.status(400).json({ message: "Book is not in favourites" });
    }

    user.favourites = user.favourites.filter(
      (favId) => favId.toString() !== bookId
    );
    await user.save();

    res.status(200).json({
      message: "Book removed from favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    next(error);
  }
};
