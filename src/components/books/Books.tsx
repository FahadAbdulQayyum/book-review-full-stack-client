import { Fragment, useContext, useEffect } from 'react'
import BookContext from '../../context/book/bookContext'
import BookItem from './BookItem';
import Spinner from "../layout/Spinner"

const Books = () => {
    const bookContext = useContext(BookContext)

    const { books, filtered, getBooks, loading } = bookContext;

    const BookList = Array.isArray(books) ? books : []

    useEffect(() => {
        getBooks()
        // eslint-disable-next-line
    }, [])

    if (books !== null && books.length === 0 && !loading) {
        return <h4>No Book Found, Please use form to add one</h4>
    }

    if (filtered?.length === 0) {
        return <h4>No Searched Book Found.</h4>
    }

    return (
        <Fragment>
            {/* {books.map(book => <BookItem key={book.id} book={book} />)} */}
            {/* {
                filtered ? filtered?.map(book => <BookItem key={book?.id} book={book} />)
                    :
                    books?.map(book => <BookItem key={book?.id} book={book} />)
            } */}

            {books !== null && !loading ? (
                <>
                    {
                        // filtered ? filtered?.map(book => <BookItem key={book?.id} book={book} />)
                        filtered ? filtered?.map(book => <BookItem key={book?._id} book={book} />)
                            :
                            // BookList?.map(book => <BookItem key={book?.id} book={book} />)
                            BookList?.map(book => <BookItem key={book?._id} book={book} />)
                    }
                </>
            ) : <Spinner />}
        </Fragment>
    )
}

export default Books
