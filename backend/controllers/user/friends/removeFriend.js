import User from "../../../models/User.js";

export const removeFriend = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    if (!friendId) {
      return res.status(400).json({ error: "Friend ID is required" });
    }

    const currentUserId = req.user.id; // from verifyAccessToken
    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!currentUser.friends.includes(friendId)) {
      return res.status(400).json({ error: "This user is not in your friends list" });
    }

    currentUser.friends = currentUser.friends.filter(
      (f) => f.toString() !== friendId
    );
    await currentUser.save();

    res.status(200).json({
      message: "Friend removed successfully",
      user: currentUser,
    });
  } catch (error) {
    next(error);
  }
};
