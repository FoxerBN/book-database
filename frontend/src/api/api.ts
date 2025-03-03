// src/api/api.ts
import axios from "axios";
import { Book } from "../interfaces/Book";

export const fetchFavorites = async (): Promise<Book[]> => {
  const { data } = await axios.get<Book[]>(
    "http://localhost:3001/api/books/favorites",
    {
      withCredentials: true,
    }
  );
  return data;
};

export const addToFavorites = async (bookId: string): Promise<any> => {
  const { data } = await axios.post(
    `http://localhost:3001/user/${bookId}/favourite`,
    {},
    { withCredentials: true }
  );
  return data;
};

export const removeFromFavorites = async (bookId: string): Promise<any> => {
  const { data } = await axios.delete(
    `http://localhost:3001/user/${bookId}/deletefavourite`,
    { withCredentials: true }
  );
  return data;
};

export const updateUserQuote = async (quote: string) => {
  try {
    const response = await axios.put(
      "http://localhost:3001/user/quote",
      { quote },
      { withCredentials: true }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Failed to update quote:", error);
    return false;
  }
};

export const fetchOneBook = async (id: string) => {
  // You can use fetch or axios; below is fetch for minimal change from your snippet
  const response = await fetch(`http://localhost:3001/api/books/one/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }
  const data = await response.json();
  return data;
};

export const toggleLike = async (bookId: string) => {
  const { data } = await axios.post(
    `http://localhost:3001/api/books/${bookId}/like`,
    {},
    { withCredentials: true }
  );
  return data;
};

//* FRIENDS API'S
export async function searchUsersByName(name: string) {
  const res = await axios.get(
    `http://localhost:3001/user/friends/search?query=${name}`,
    { withCredentials: true }
  );
  return res.data;
}

export async function addFriend(friendId: string) {
  const res = await axios.post(
    "http://localhost:3001/user/friends/add",
    { friendId },
    { withCredentials: true }
  );
  return res.data;
}

export async function removeFriend(friendId: string) {
  const res = await axios.delete(
    `http://localhost:3001/user/friends/remove/${friendId}`,
    { withCredentials: true }
  );
  return res.data;
}

export async function getAllFriends() {
  const res = await axios.get("http://localhost:3001/user/friends/all", {
    withCredentials: true,
  });
  return res.data;
}
