import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema, "review");
