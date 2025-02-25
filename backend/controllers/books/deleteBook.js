import Book from '../../models/Book.js'

const deleteBook = async(req,res,next)=>{
    try {
        const { id } = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook){
            return res.status(404).json({error: 'Book not found'})
        }
        res.status(200).json({message: 'Book deleted successfully'})
        
    } catch (error) {
        next(error)
    }
}
export default deleteBook