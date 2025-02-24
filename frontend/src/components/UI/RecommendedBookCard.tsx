import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../../interfaces/Book";

interface RecommendedBookCardProps {
  book: Book;
}

const RecommendedBookCard: React.FC<RecommendedBookCardProps> = ({ book }) => {
  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-200">
      {book.imageLink && (
        <img
          className="w-full h-48 object-cover"
          src={book.imageLink}
          alt={book.title}
        />
      )}
      <div className="p-5 flex min-h-47 justify-between flex-col">
        <div className="flex-grow">
          <h5 className="text-lg font-semibold text-gray-900">{book.title}</h5>
          <p className="text-sm text-gray-500 mb-4">by {book.author}</p>
        </div>
        <div className="flex gap-3">
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-sm font-medium py-3 px-4 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-all whitespace-nowrap"
          >
            Wikipedia
          </a>
          <Link
            to={`/onebook/${book._id}`}
            className="flex-1 text-center text-sm font-medium py-3 px-4 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-all whitespace-nowrap"
          >
            Show
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendedBookCard;
