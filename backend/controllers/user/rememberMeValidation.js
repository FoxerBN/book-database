import jwt from "jsonwebtoken";

export const validateAuth = (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken; // May not exist!

  if (accessToken) {
    return jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        return res.json({ success: true, user: { id: user.id, username: user.username } });
      }
    });
  }

  if (refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
      if (err) {
        return res.json({ success: false, message: "Session expired" });
      }

      const newAccessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      return res.json({ success: true, user: { id: user.id, username: user.username } });
    });
  }
  return res.json({ success: false, message: "No valid token found" });
};
