import { useContext, useEffect, useState } from "react"
import BookContext from "../../context/book/bookContext";
import { Book } from "../../context/book/BookState";

const BookForm = () => {

    const bookContext = useContext(BookContext)

    const { addBook, current, clearCurrent, updateBook } = bookContext;

    const [book, setBook] = useState<Book>({
        _id: '',
        title: '',
        author: '',
        publicationYear: '',
        genre: 'fictional',
        bookReviewText: '',
        rating: 0
    })


    useEffect(() => {
        if (current !== null) {
            setBook(current);
        } else {
            setBook({
                _id: '',
                title: '',
                author: '',
                publicationYear: '',
                genre: 'fictional',
                bookReviewText: '',
                rating: 0
            })
        }
    }, [current])

    const { title, author, publicationYear, genre, bookReviewText, rating } = book;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value
        })
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (current === null) {
            addBook(book);
        } else {
            updateBook(book)
        }
        clearAll()
    }

    const clearAll = () => {
        clearCurrent();

        setBook({
            _id: '',
            title: '',
            author: '',
            publicationYear: '',
            genre: 'fictional',
            bookReviewText: '',
            rating: 0
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Book' : 'Add Book'}</h2>
            <input
                type="text"
                placeholder="Name"
                name="title"
                value={title}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Author"
                name="author"
                value={author}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Publication year"
                name="publicationYear"
                value={publicationYear}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Book Review Text"
                name="bookReviewText"
                value={bookReviewText}
                onChange={onChange}
            />
            <h5>Book Genre</h5>
            <input
                type="radio"
                name="genre"
                value={'Fictional'}
                checked={genre.toLowerCase() === "fictional"}
                onChange={onChange}
            />{' '}Fictional
            {' '}
            <input
                type="radio"
                name="genre"
                value={'RealLife'}
                checked={genre.toLowerCase() === "reallife"}
                onChange={onChange}
            />{' '}RealLife
            <h5>Rating</h5>
            <input
                type="number"
                placeholder="rating"
                name="rating"
                value={rating}
                onChange={onChange}
            />
            <div>
                <input type="submit" value={current ? "Update Book" : "Add Book"} className="btn btn-primary btn-block" />
            </div>
            {current && <div>
                <input type="submit" value={"Clear"} onClick={clearAll} className="btn btn-dark btn-block" />
            </div>}
        </form>
    )
}

export default BookForm