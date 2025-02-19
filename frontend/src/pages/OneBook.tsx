import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/UI/CommentSection";

interface Book {
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
  // We expect an aggregated review document (if it exists) as the first element.
  reviews: Review[];
}

interface Review {
  _id: string;
  rating: number[]; // Array of ratings
  comment: string[];
  likes: number;
  createdAt: string;
}

const OneBook: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Callback to update the aggregated review from child component actions
  const updateReview = (updatedReview: Review) => {
    if (book) {
      setBook({
        ...book,
        reviews: [updatedReview],
      });
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/books/one/${id}`);
        const data = await response.json();
        if (data.book) {
          setBook(data.book);
          console.log(data.book);
          
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!book) return <p className="text-center text-lg text-red-500">Book not found</p>;

  // Get the aggregated review (if available)
  const aggregatedReview = book.reviews && book.reviews.length > 0 ? book.reviews[0] : null;

  return (
    <div className="max-w-2xl mx-auto my-10 flex flex-col md:flex-row gap-8">
      {/* Left Side - Book Details */}
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
      </div>

      <div className="md:w-1/2">
        <CommentSection review={aggregatedReview} bookId={book._id} onUpdateReview={updateReview} />
      </div>
    </div>
  );
};

export default OneBook;
