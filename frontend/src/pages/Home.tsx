import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce"; // npm install use-debounce
import { Book } from "../interfaces/Book";
import { fetchPaginateBooks, searchBooks } from "../api/api";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import SortByDropdown from "../components/UI/SortByDropdown";
import RecommendedBookCard from "../components/UI/RecommendedBookCard";
const Home: React.FC = () => {
  // PAGINATION STATE
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("year");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [totalPages, setTotalPages] = useState(1);

  // SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");
  // Debounced version of the search query
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (debouncedSearchQuery.trim().length > 0) return;

    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await fetchPaginateBooks(page, sortBy, order);
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching paginated books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [page, sortBy, order, debouncedSearchQuery]);
  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const doSearch = async () => {
      setSearchLoading(true);
      try {
        const res = await searchBooks(debouncedSearchQuery.trim());
        setSearchResults(res.data.books);
      } catch (error) {
        console.error("Error searching books:", error);
      } finally {
        setSearchLoading(false);
      }
    };

    doSearch();
  }, [debouncedSearchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Top bar for sorting and searching */}
      <div className="flex justify-between items-center mb-4 relative">
        <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />

        {/* SEARCH INPUT */}
        <div className="flex flex-col w-80">
          <input
            className="p-1 text-center border rounded-xl"
            placeholder="Search book..."
            type="text"
            value={searchQuery}
            onChange={handleSearch}
          />

          {debouncedSearchQuery && searchResults.length > 0 && (
            <ul className="border rounded-md bg-white absolute top-14 left-1/2 transform -translate-x-1/2 w-80 max-h-60 overflow-y-auto z-10">
              {searchResults.map((item) => (
                <li key={item._id} className="p-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={`/onebook/${item._id}`}>
                    <span className="font-semibold">{item.title}</span>{" "}
                    <span className="text-xs text-gray-500">
                      ({item.author})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* "No results" message */}
          {debouncedSearchQuery && !searchLoading && searchResults.length === 0 && (
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-80 bg-white border rounded-md z-10 p-2 text-sm text-gray-500">
              No results found.
            </div>
          )}

          {/* Loader if searching */}
          {searchLoading && (
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-80 bg-white border rounded-md z-10 p-2 text-center">
              <ClipLoader size={20} color="#3498db" />
            </div>
          )}
        </div>

        <button
          onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          className="p-2 bg-gray-300 cursor-pointer rounded-md flex items-center gap-2"
        >
          {order === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}{" "}
          {order.toUpperCase()}
        </button>
      </div>

      {/* PAGINATION LIST (only visible if there's no search, or you can keep it if you want) */}
      {loading ? (
        <div className="flex justify-center mt-6">
          <ClipLoader size={40} color="#3498db" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 place-items-center">
        {books?.map((book) => (
          <RecommendedBookCard key={book._id} book={book} />
        ))}
      </div>
      )}

      {/* PAGINATION CONTROLS (visible if no active search) */}
      {!debouncedSearchQuery && (
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
