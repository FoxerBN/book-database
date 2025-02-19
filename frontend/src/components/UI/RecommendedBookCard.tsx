import React from "react";
import { Link } from "react-router-dom";

export interface Book {
  _id: string;
  title: string;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  year: number;
  genre: string;
  totalLikes?: number;
}

interface RecommendedBookCardProps {
  book: Book;
}

const RecommendedBookCard: React.FC<RecommendedBookCardProps> = ({ book }) => {
  return (
    <div
      className="max-w-xs border border-gray-200 rounded-lg shadow-md dark:border-gray-700 overflow-hidden flex flex-col h-full"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {book.imageLink && (
        <img
          className="w-full h-40 object-cover"
          src={book.imageLink}
          alt={book.title}
        />
      )}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h5 className="mb-1 text-xl font-bold" style={{ color: "var(--text-color)" }}>
            {book.title}
          </h5>
          <p className="mb-3 text-sm text-gray-500 dark:text-gray-500">by {book.author}</p>
        </div>
        <div className="flex gap-2 mt-auto">
          <a
          style={{ color: "var(--text-color)" }}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-1 py-2 text-sm font-medium border border-black rounded focus:ring-2 focus:ring-gray-300"
          >
            Wikipedia
          </a>
          <Link
            to={`/onebook/${book._id}`}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium border border-black rounded focus:ring-2 focus:ring-gray-300"
          >
            Show Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendedBookCard;
