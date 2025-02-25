import { Review } from "./Review";
export interface Book {
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
    totalLikes?: number;
    reviews: Review[];
  }
  