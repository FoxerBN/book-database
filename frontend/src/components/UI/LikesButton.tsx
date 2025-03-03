// src/components/UI/LikesButton.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toggleLike } from "../../api/api";

interface LikesButtonProps {
  bookId: string;
  initialLikes: number;
  initiallyLiked: boolean;
}

const LikesButton: React.FC<LikesButtonProps> = ({
  bookId,
  initialLikes,
  initiallyLiked,
}) => {
  const [liked, setLiked] = useState<boolean>(initiallyLiked);
  const [count, setCount] = useState<number>(initialLikes);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLike = async () => {
    setLoading(true);
    try {
      const data = await toggleLike(bookId);
      setCount(data.likes);
      setLiked(data.isLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 rounded-md w-18">
      <button
        onClick={handleLike}
        disabled={loading}
        className="relative flex items-center justify-center w-9 h-9 border-0 outline-none bg-transparent"
      >
        <motion.span
          className="absolute w-10 h-10 bg-pink-500 rounded-full"
          animate={{ scale: liked ? 2 : 0, opacity: liked ? 0 : 0.6 }}
          transition={{ duration: 0.6 }}
        />
        <Heart
          className={`relative w-6 h-6 transition-colors duration-300 ${
            liked
              ? "fill-pink-500 stroke-pink-500"
              : "fill-gray-500 stroke-gray-500"
          }`}
        />
      </button>
      <span className="text-lg font-semibold text-gray-600 px-2">
        {count}
      </span>
    </div>
  );
};

export default LikesButton;
