import React, { useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CommentSectionProps } from "../../interfaces/Review";
import LikesButton from "../UI/LikesButton";

const CommentSection: React.FC<CommentSectionProps> = ({
  review,
  bookId,
  onUpdateReview,
}) => {
  const [newComment, setNewComment] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);
  const [ratingMessage, setRatingMessage] = useState<string | null>(null);

  // If review is null, use empty arrays for calculations.
  const ratings = review?.rating ?? [];
  const comments = review?.comment ?? [];

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    setSubmittingComment(true);
    setCommentError(null);
    setCommentSuccess(null);

    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/books/${bookId}/comment`,
        { comment: newComment }
      );
      if (data.review) {
        onUpdateReview(data.review);
        setNewComment("");
        setCommentSuccess(data.message || "Comment added successfully");
        setTimeout(() => setCommentSuccess(null), 3000);
      }
    } catch (error: any) {
      console.error("Error adding comment:", error.response?.data || error.message);
      setCommentError(error.response?.data.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleAddRating = async (rating: number) => {
    if (rating < 1 || rating > 5) return;
    setSubmittingRating(true);

    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/books/${bookId}/rating`,
        { rating }
      );
      if (data.review) {
        onUpdateReview(data.review);
        setSelectedRating(0);
        setRatingMessage(data.message || "Rating added successfully");
        setTimeout(() => setRatingMessage(null), 3000);
      }
    } catch (error: any) {
      console.error("Error adding rating:", error.response?.data || error.message);
      setRatingMessage(error.response?.data.message || "Failed to add rating");
      setTimeout(() => setRatingMessage(null), 3000);
    } finally {
      setSubmittingRating(false);
    }
  };

  // We'll pass the current like count and a default 'isLiked' boolean.
  // If you want a true server-based 'isLiked' determination, fetch it in your review or 
  // decode from IP in your backend and send back a field like `isLiked`.
  const initialLikes = review?.likes ?? 0;
  const initiallyLiked = false; // Or from server: e.g., review?.isLiked ?? false

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow space-y-6">
      {/* Replaces the old like button */}
      <LikesButton
        bookId={bookId}
        initialLikes={initialLikes}
        initiallyLiked={initiallyLiked}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">
            Avg Rating: {averageRating.toFixed(1)}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= Math.round(averageRating) ? (
                <FaStar key={star} className="text-yellow-400" />
              ) : (
                <FaRegStar key={star} className="text-yellow-400" />
              )
            )}
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to leave a comment!</p>
        ) : (
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {comments.map((text, index) => (
              <li key={index} className="p-2 border-b border-gray-200">
                {text}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Comment */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          placeholder="Write your comment here..."
        ></textarea>

        {commentError && (
          <p className="mt-2 text-red-600">{commentError}</p>
        )}
        {commentSuccess && (
          <p className="mt-2 text-green-600">{commentSuccess}</p>
        )}

        <button
          onClick={handleAddComment}
          disabled={submittingComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {submittingComment ? "Submitting..." : "Submit Comment"}
        </button>
      </div>

      {/* Add Rating */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Add Rating</h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleAddRating(star)}
              disabled={submittingRating}
              className={`text-2xl ${
                star <= selectedRating ? "text-yellow-400" : "text-gray-300"
              }`}
              onMouseEnter={() => setSelectedRating(star)}
              onMouseLeave={() => setSelectedRating(0)}
            >
              <FaStar />
            </button>
          ))}
        </div>
        {ratingMessage && (
          <p className="mt-2 text-green-600 text-sm">{ratingMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
