import User from "../../models/User.js";

const deleteUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
  });

  res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
  });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

export default deleteUser;