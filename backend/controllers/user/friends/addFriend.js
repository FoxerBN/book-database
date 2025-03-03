// controllers/user/friends/addFriend.js
import User from "../../../models/User.js";

export const addFriend = async (req, res, next) => {
  try {
    const { friendId } = req.body;
    if (!friendId) {
      return res.status(400).json({ error: "Friend ID is required" });
    }

    const currentUserId = req.user.id;

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentUser.friends.includes(friendId)) {
      return res
        .status(400)
        .json({ error: "This user is already in your friends list" });
    }

    currentUser.friends.push(friendId);
    await currentUser.save();

    res.status(200).json({ message: "Friend added successfully", user: currentUser });
  } catch (error) {
    next(error);
  }
};
