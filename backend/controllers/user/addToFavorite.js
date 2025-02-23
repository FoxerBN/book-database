import User from "../../models/User.js";
import Book from "../../models/Book.js";

export const addToFavourites = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const { bookId } = req.params;
    const userId = req.user.id; 

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favourites.includes(bookId)) {
      return res.status(400).json({ message: "Book already in favourites" });
    }

    user.favourites.push(bookId);
    await user.save();

    res.status(200).json({
      message: "Book added to favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    next(error);
  }
};
