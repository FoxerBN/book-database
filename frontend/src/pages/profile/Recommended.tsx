// src/pages/profile/Recommended.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommendedBookCard, { Book } from "../../components/UI/RecommendedBookCard";

const Recommended: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cachedBooks = localStorage.getItem("recommendedBooks");
    if (cachedBooks) {
      setBooks(JSON.parse(cachedBooks));
      setLoading(false);
    } else {
      axios
        .get<Book[]>("http://localhost:3001/api/books/recommended")
        .then((response) => {
          setBooks(response.data);
          localStorage.setItem("recommendedBooks", JSON.stringify(response.data));
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch recommended books.");
          setLoading(false);
        });
    }
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full text-lg font-medium">
        Loading recommended books...
      </div>
    );
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1
        className="text-3xl font-sans text-center mb-8"
      >
        Recommended Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 ">
        {books.map((book) => (
          <RecommendedBookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
