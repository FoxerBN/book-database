import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res, next) => {
  try {
    const { username, password, rememberMe } = req.body; // Receive rememberMe from frontend

    const user = await User.findOne({
      $or: [{ name: username }, { email: username }],
    });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const payload = { id: user._id, username: user.name };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    if (rememberMe) {
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "180d",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 180 * 24 * 60 * 60 * 1000,
      });
    }

    res.json({
      message: "Login successful",
      user: { id: user._id, username: user.name },
    });
  } catch (error) {
    next(error);
  }
};
