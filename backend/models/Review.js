// models/Review.js
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    rating: { type: [Number], default: [] },
    comment: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
    ratedByIPs: [{ type: String }],
    likedByIPs: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema, "review");
