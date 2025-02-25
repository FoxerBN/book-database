import User from "../../models/User.js";

export const updateQuote = async (req, res) => {
  try {
    const { quote } = req.body;
    if (!quote) {
      return res.status(400).json({ message: "Quote is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { quote },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ quote: updatedUser.quote });
  } catch (error) {
    console.error("Error updating quote:", error);
    res.status(500).json({ message: "Server error" });
  }
};