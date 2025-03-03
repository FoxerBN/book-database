// controllers/user/friends/getFriends.js
import User from "../../../models/User.js";

export const getFriends = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = await User.findById(currentUserId).populate("friends", "_id name");
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ friends: currentUser.friends });
  } catch (error) {
    next(error);
  }
};
