import axios from "axios";

// Make sure to set your API key in your environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const verifyCommentMiddleware = async (req, res, next) => {
  try {
    const { comment } = req.body;
    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }
    const prompt = `
Please evaluate the following comment for any vulgar or inappropriate language, regardless of the language (e.g., English, Czech, Slovak, Spain etc.).
Return only "true" if the comment is completely clean, or "false" if it contains any vulgar or inappropriate words.
Do not include any extra text or explanation.
Comment: "${comment}"
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
        max_tokens: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const message = response.data.choices[0].message.content
      .trim()
      .toLowerCase();

    if (message === "true") {
      return next();
    } else if (message === "false") {
      return res.status(400).json({ message: "inappropriate comment" });
    } else {
      console.error("Unexpected API response:", message);
      return res.status(500).json({ message: "Server error" });
    }
  } catch (error) {
    console.error("Error in comment verification middleware:", error);
    next(error);
  }
};
