import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/UI/CommentSection";
import AddToFavorites from "../components/UI/AddToFavorites";
import { Book } from "../interfaces/Book";
import { Review } from "../interfaces/Review";
import { fetchOneBook } from "../api/api"; // <-- import your API helper

const OneBook: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [ip, setIp] = useState<string>("")

  const updateReview = (updatedReview: Review) => {
    if (book) {
      setBook({
        ...book,
        reviews: [updatedReview],
      });
    }
  };

  useEffect(() => {
    const getBook = async () => {
      try {
        const data = await fetchOneBook(id!);
        if (data.book) {
          setBook(data.book);
          setIp(data.ip)
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!book)
    return <p className="text-center text-lg text-red-500">Book not found</p>;

  const aggregatedReview =
    book.reviews && book.reviews.length > 0 ? book.reviews[0] : null;

  return (
    <div className="max-w-2xl mx-auto my-10 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img
          src={`/${book.imageLink}`}
          alt={book.title}
          className="w-full h-80 object-cover rounded-lg shadow"
        />
        <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
        <p className="text-gray-500 text-lg">by {book.author}</p>
        <p className="text-gray-600 text-sm mt-2">
          {book.genre} | {book.pages} pages | {book.year}
        </p>
        <a
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mt-4 inline-block"
        >
          Read more on Wikipedia
        </a>
        <button className="mt-4">
          <AddToFavorites bookId={book._id} />
        </button>
      </div>

      <div className="md:w-1/2">
        <CommentSection
          review={aggregatedReview}
          bookId={book._id}
          onUpdateReview={updateReview}
          ip={ip}
        />
      </div>
    </div>
  );
};

export default OneBook;
