// src/components/ProfileLayout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProfileLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <aside 
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
      className="w-64 bg-gray-100 p-6 border-r border-gray-300">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-1">Your Name</h2>
          <p className="text-sm">
            "A little quote or description about you."
          </p>
        </div>
        <nav >
          <ul className="space-y-3">
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                Recommended
              </Link>
            </li>
            <li>
              <Link
                to="/profile/favourites"
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                Favourites
              </Link>
            </li>
            <li>
              <Link
                to="/profile/friends"
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                Friends
              </Link>
            </li>
            <li className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors">
              Delete Account
            </li>
            <li>
              <Link
                to="/profile/support"
                className="block px-4 py-2 rounded hover:bg-gray-400 transition-colors">
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
  );
};

export default ProfileLayout;
