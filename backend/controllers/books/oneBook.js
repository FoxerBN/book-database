import mongoose from 'mongoose';
import Book from '../../models/Book.js';

const getOneBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid book ID!' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found!' });
        }

        res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
};

export default getOneBook;
