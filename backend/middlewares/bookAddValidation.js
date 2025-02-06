import { body, validationResult } from "express-validator";

export const validateAddBook = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("imageLink")
    .optional()
    .isURL()
    .withMessage("Image link must be a valid URL"),
  body("language").trim().notEmpty().withMessage("Language is required"),
  body("link").optional().isURL().withMessage("Link must be a valid URL"),
  body("pages")
    .isInt({ min: 1 })
    .withMessage("Pages must be a positive integer"),
  body("year").isInt().withMessage("Year must be a valid integer"),
  body("genre").trim().notEmpty().withMessage("Genre is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];