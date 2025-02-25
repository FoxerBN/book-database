import Book from "../../models/Book.js";
const getRecommendedBooks = async (req, res) => {
  try {
    const recommendedBooks = await Book.aggregate([
      {
        $lookup: {
          from: "review",
          localField: "_id",
          foreignField: "book",
          as: "reviews"
        }
      },
      {
        $addFields: {
          totalLikes: {
            $sum: {
              $map: {
                input: "$reviews",
                as: "review",
                in: { $ifNull: ["$$review.likes", 0] }
              }
            }
          }
        }
      },
      { $sort: { totalLikes: -1 } },
      { $limit: 6 }
    ]);

    res.json(recommendedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
export default getRecommendedBooks