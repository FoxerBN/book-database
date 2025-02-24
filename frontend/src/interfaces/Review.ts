export interface Review {
    _id: string;
    rating: number[];
    comment: string[];
    likes: number;
    createdAt: string;
  }
  
  export interface CommentSectionProps {
    review: Review | null;
    bookId: string;
    onUpdateReview: (updatedReview: Review) => void;
  }
  