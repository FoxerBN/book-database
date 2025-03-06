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
  quote: {
    type: String,
    default: "A little quote or description about you.",
  },
  profilePhoto: {
    type: String,
    default:
      "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg",
  },
  cloudinaryId: { type: String, default: null },

  favourites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Book", default: [] },
  ],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
});

const User = mongoose.model("User", userSchema);
export default User;
