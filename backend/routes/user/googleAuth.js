import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Start Google OAuth flow and pass the rememberMe flag via query/state
router.get("/google", (req, res, next) => {
  const rememberMe = req.query.rememberMe || "false";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    state: rememberMe,
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const payload = { id: req.user._id, username: req.user.name, quote: req.user.quote,profilePhoto: req.user.profilePhoto };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    const rememberMe = req.query.state === "true";
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

    res.redirect("http://localhost:5173/login-success");
  }
);

export default router;
