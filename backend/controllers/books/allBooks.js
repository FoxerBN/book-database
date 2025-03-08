import Book from '../../models/Book.js'

const getAllBooks = async(req,res,next)=>{
    try {
        const books = await Book.find().lean().exec();
        res.status(200).json({books})
        
    } catch (error) {
        next(error)
    }
}

export default getAllBooks