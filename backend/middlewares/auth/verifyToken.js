import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  if (!req.cookies || !req.cookies.accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden - Invalid or expired token" });
    }

    req.user = user;
    next();
  });
};
