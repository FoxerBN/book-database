import rateLimit from "express-rate-limit";

export const commentRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
  message: { message: "You can only add up to 5 comments per day." },
  headers: true,
});
