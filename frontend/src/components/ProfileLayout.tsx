import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { updateUserQuote } from "../api/api";
import useRemoveAccount from "../hooks/useRemoveAccount";

const ProfileLayout: React.FC = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") as string);
  const [editing, setEditing] = useState(false);
  const [quote, setQuote] = useState(storedUser?.quote || "");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const removeAccount = useRemoveAccount();
  
  const handleQuoteClick = () => setEditing(true);

  
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && quote.trim() !== "") {
      setLoading(true);
      try {
        const success = await updateUserQuote(quote);
        if (success) {
          const updatedUser = { ...storedUser, quote };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setEditing(false);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-screen flex">
      <div className="absolute top-2 right-4 max-[480px]:block min-[481px]:hidden z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-[var(--text-color)]"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <aside
        className={`
          w-2/3 min-[481px]:w-1/3 p-6 border-r bg-[rgba(150, 138, 71, 0.151)] border-gray-300 
          fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          min-[525px]:relative min-[525px]:translate-x-0
        `}
      >
        <div className="mb-8">
          <div className="flex flex-row items-center">
          
          <img className="w-15 rounded-2xl m-0.5 " src={storedUser.profilePhoto} alt="" />
          <h2 className="text-xl font-semibold mb-1">{storedUser?.username}</h2>
          </div>
          {!editing ? (
            <p
              style={{ fontFamily: "var(--quote-font)" }}
              className="text-xl cursor-pointer flex items-center gap-1"
              onClick={handleQuoteClick}
            >
              "{quote}" <CiEdit />
            </p>
          ) : (
            <input
              type="text"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="p-2 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full"
              placeholder="Enter your new quote..."
              autoFocus
            />
          )}
        </div>
        <nav>
          <ul className="space-y-3">
          {menuOpen && <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                Home
              </Link>
            </li>}
            <li>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Recommended
              </Link>
            </li>
            <li>
              <Link
                to="/profile/favourites"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Favourites
              </Link>
            </li>
            <li>
              <Link
                to="/profile/friends"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Friends
              </Link>
            </li>
            <li
              onClick={removeAccount}
              className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors cursor-pointer"
            >
              Delete Account
            </li>
            <li>
              <Link
                to="/profile/support"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                to="/profile/profilephoto"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Change profile photo
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
