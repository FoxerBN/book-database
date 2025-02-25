// src/api/api.ts
import axios from "axios";
import { Book } from "../interfaces/Book";

export const fetchFavorites = async (): Promise<Book[]> => {
  const { data } = await axios.get<Book[]>("http://localhost:3001/api/books/favorites", {
    withCredentials: true,
  });
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