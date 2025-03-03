// controllers/userController.js
import User from "../../../models/User.js";

export const searchUsersByName = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "No search query provided" });
    }
    const users = await User.find({
      name: { $regex: query, $options: "i" },
    }).select("_id name");

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};