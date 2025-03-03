export interface Review {
    _id: string;
    rating: number[];
    comment: string[];
    likes: number;
    createdAt: string;
    likedByIPs: string[];
  }
  
  export interface CommentSectionProps {
    review: Review | null;
    bookId: string;
    onUpdateReview: (updatedReview: Review) => void;
    ip: string;
  }
  