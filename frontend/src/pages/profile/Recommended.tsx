import React from "react";
import useFetch from "../../hooks/useFetch";
import RecommendedBookCard from "../../components/UI/RecommendedBookCard";
import { ClipLoader } from "react-spinners";
import { Book } from "../../interfaces/Book";
const Recommended: React.FC = () => {
  const { data: books, loading, error } = useFetch<Book[]>(
    "http://localhost:3001/api/books/recommended",
    "recommendedBooks"
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader size={50} color={"#4A90E2"} loading={loading} />
      </div>
    );

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-sans text-center mb-8">Recommended Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {books?.map((book) => (
          <RecommendedBookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
