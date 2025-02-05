import Book from '../../models/Book.js'

const searchBooks = async(req,res,next)=>{
    try {
        const { query } = req.query
        const books = await Book.find({
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { author: { $regex: query, $options: 'i' } }
            ]
          }).collation({ locale: 'sk', strength: 1 });
      
          res.status(200).json({ books });
    } catch (error) {
        next(error)
    }
}
export default searchBooks