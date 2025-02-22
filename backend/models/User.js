// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  googleId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  // Add the quote field with default
  quote: {
    type: String,
    default: "A little quote or description about you.",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
