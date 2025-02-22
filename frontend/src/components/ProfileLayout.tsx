// src/components/ProfileLayout.tsx
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import axios from "axios";

const ProfileLayout: React.FC = () => {
  // Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") as string);
  const [editing, setEditing] = useState(false);
  const [quote, setQuote] = useState(storedUser.quote);
  const [loading, setLoading] = useState(false);

  // Open input field when clicking the quote or edit icon
  const handleQuoteClick = () => setEditing(true);

  // Handle Enter keypress
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && quote.trim() !== "") {
      setLoading(true);

      try {
        const response = await axios.put(
          "http://localhost:3001/user/quote",
          { quote },
          { withCredentials: true }
        );

        if (response.status === 200) {
          const updatedUser = { ...storedUser, quote };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setEditing(false);
        }
      } catch (error) {
        console.error("Failed to update quote:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-screen flex relative">
      {/* Wrap main content in a container that dims when editing */}
      <div className={`flex w-full transition duration-300 ease-in-out ${editing ? "brightness-50" : ""}`}>
        <aside
          style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
          className="w-1/3 p-6 border-r border-gray-300"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-1">{storedUser.username}</h2>
            <p
              style={{ fontFamily: "var(--quote-font)" }}
              className="text-xl cursor-pointer flex items-center gap-1"
              onClick={handleQuoteClick}
            >
              "{quote}" <CiEdit />
            </p>
          </div>
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Recommended
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/favourites"
                  className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Favourites
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/friends"
                  className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Friends
                </Link>
              </li>
              <li className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                Delete Account
              </li>
              <li>
                <Link
                  to="/profile/support"
                  className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>

      {/* Input field overlay for editing the quote */}
      {editing && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <input
            type="text"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className={`p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            placeholder="Enter your new quote..."
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default ProfileLayout;
