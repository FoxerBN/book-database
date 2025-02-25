import User from "../../models/User.js";

const favBooks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("favourites");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.favourites);
  } catch (error) {
    next(error);
  }
};
export default favBooks;
