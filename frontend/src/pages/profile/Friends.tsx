// src/pages/FriendsPage.tsx
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  addFriend,
  removeFriend,
  getAllFriends,
} from "../../api/api";
import useErrorHandler from "../../hooks/useErrorHandler";
import useSearchUsers from "../../hooks/useSearchUser"; 

interface User {
  _id: string;
  name: string;
}

const FriendsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const [friends, setFriends] = useState<User[]>([]);
  const { globalError, handleError } = useErrorHandler();
  
  const { foundUsers, error: searchError, loading } = useSearchUsers(debouncedSearchText);
  
  const handleAddFriend = async (friendId: string) => {
    try {
      const data = await addFriend(friendId);
      if (data.user) {
        fetchMyFriends();
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      const data = await removeFriend(friendId);
      if (data.user) {
        fetchMyFriends();
      }
    } catch (err) {
      handleError(err);
    }
  };

  const fetchMyFriends = async () => {
    try {
      const data = await getAllFriends();
      setFriends(data.friends);
      localStorage.setItem("myFriends", JSON.stringify(data.friends));
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("myFriends");
    if (saved) {
      setFriends(JSON.parse(saved));
    } else {
      fetchMyFriends();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Friends Page</h1>

        {globalError && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 border border-red-200">
            {globalError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Searching Section */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-3">Find New Friends</h2>
            <input
              type="text"
              placeholder="Search user by name..."
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {searchError && (
              <p className="text-red-500 mb-2">{searchError}</p>
            )}

            {loading && <p className="text-gray-500">Loading...</p>}

            <ul className="space-y-3">
              {foundUsers.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                >
                  <span>{user.name}</span>
                  <button
                    onClick={() => handleAddFriend(user._id)}
                    className="bg-blue-500 text-2xl text-white px-2 hover:scale-110 rounded cursor-pointer hover:bg-blue-600 transition-all"
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Friends List Section */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-3">My Friends</h2>
            {friends.length === 0 ? (
              <p className="text-gray-500">No friends yet.</p>
            ) : (
              <ul className="space-y-2">
                {friends.map((friend) => (
                  <li
                    key={friend._id}
                    className="bg-gray-100 px-3 py-2 rounded flex items-center justify-between"
                  >
                    <span>{friend.name}</span>
                    <button
                      onClick={() => handleRemoveFriend(friend._id)}
                      className="text-red-500 cursor-pointer hover:scale-130 hover:text-red-700 transition-all"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
