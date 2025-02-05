import Book from "../../models/Book.js";

const paginateBooks = async (req, res, next) => {
  try {
    const totalBooks = await Book.countDocuments();
    const { page = 1, sortBy = 'year', order = 'asc' } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const allowedSortFields = ['author', 'country', 'pages', 'year'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'year';
    const sortOrder = order === 'desc' ? -1 : 1;

    const books = await Book.find()
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limit);

    res.status(200).json({
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      books,
    });
  } catch (error) {
    next(error)
  }
};

export default paginateBooks;
