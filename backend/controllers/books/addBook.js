import Book from '../../models/Book.js'

const addBook = async( req, res, next ) =>{
    try {
        const { title, author, country, imageLink, 
        language, link, pages, year, genre} = req.body

        const newBook = new Book({
            title, author, country, imageLink, language, link, pages, year, genre,reviews: []
        })
        await newBook.save()
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        next(error)
    }
}
export default addBook