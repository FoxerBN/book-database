//todo rework this to controllers and route 
app.get("/auth/validate", (req, res) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken; // May not exist!
  
    // 1️⃣ Try verifying accessToken first
    if (accessToken) {
      return jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
          return res.json({ success: true, user: { id: user.id, username: user.username } });
        }
      });
    }
  
    // 2️⃣ If accessToken is expired, check refreshToken (only if it exists)
    if (refreshToken) {
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(401).json({ success: false, message: "Session expired" });
  
        // Generate new accessToken
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
    return res.status(401).json({ success: false, message: "No valid token found" });
  });
  