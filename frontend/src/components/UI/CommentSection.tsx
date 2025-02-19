import React, { useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar, FaThumbsUp } from "react-icons/fa";

interface Review {
  _id: string;
  rating: number[]; // Assuming an array for aggregated ratings
  comment: string[];
  likes: number;
  createdAt: string;
}

interface CommentSectionProps {
  review: Review | null;
  bookId: string;
  onUpdateReview: (updatedReview: Review) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ review, bookId, onUpdateReview }) => {
  const [newComment, setNewComment] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [submittingLike, setSubmittingLike] = useState(false);

  const averageRating =
    review && review.rating.length > 0
      ? review.rating.reduce((a, b) => a + b, 0) / review.rating.length
      : 0;

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    setSubmittingComment(true);
    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/books/${bookId}/comment`,
        { comment: newComment }
      );
      if (data.review) {
        onUpdateReview(data.review);
        setNewComment("");
      }
    } catch (error: any) {
      console.error("Error adding comment:", error.response?.data || error.message);
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
      }
    } catch (error: any) {
      console.error("Error adding rating:", error.response?.data || error.message);
    } finally {
      setSubmittingRating(false);
    }
  };

  const handleAddLike = async () => {
    setSubmittingLike(true);
    try {
      const { data } = await axios.post(`http://localhost:3001/api/books/${bookId}/like`);
      if (data.likes !== undefined && review) {
        onUpdateReview({ ...review, likes: data.likes });
      }
    } catch (error: any) {
      console.error("Error adding like:", error.response?.data || error.message);
    } finally {
      setSubmittingLike(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow space-y-6">
      {/* Average Rating and Likes */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Avg Rating: {averageRating.toFixed(1)}</span>
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
        <div className="flex items-center space-x-1">
          <button
            onClick={handleAddLike}
            disabled={submittingLike}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaThumbsUp />
            <span className="ml-1">{review ? review.likes : 0}</span>
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {(!review || review.comment.length === 0) ? (
          <p className="text-gray-500">
            No comments yet. Be the first to leave a comment!
          </p>
        ) : (
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {review.comment.map((text, index) => (
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
      </div>
    </div>
  );
};

export default CommentSection;
