import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommendedBookCard from "../../components/UI/RecommendedBookCard";
import { Book } from "../../interfaces/Book";

const Favourites: React.FC = () => {
  const [favBooks, setFavBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get<Book[]>("http://localhost:3001/api/books/favorites", {
          withCredentials: true,
        });

        setFavBooks(data);
        localStorage.setItem("favBooks", JSON.stringify(data));
      } catch (error) {
        setError("Failed to fetch favorite books.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (favBooks.length === 0) return <p className="text-center text-gray-500">No favorite books yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-sans text-center mb-8">Your Favorite Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favBooks.map((book) => (
          <RecommendedBookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
