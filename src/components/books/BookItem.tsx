import { FC, useContext } from 'react'
// import { Book } from '../../context/book/bookContext'
import { Book } from '../../context/book/BookState'
import RatingStars from '../ratingStars/RatingStarts';

import ContactContext from '../../context/book/bookContext';

interface BookProps {
    book: Book
}

const BookItem: FC<BookProps> = ({ book }) => {

    const { deleteBook, setCurrent, clearCurrent } = useContext(ContactContext)

    // const { id, title, author, publicationYear, genre, bookReviewText, rating } = book;
    const { _id, title, author, publicationYear, genre, bookReviewText, rating } = book;

    const onDelete = () => {
        // deleteBook(id)
        deleteBook(_id)
        clearCurrent()
        // deleteBook(id: string | undefined)
    }

    const onEdit = () => {
        setCurrent(book)
        // deleteBook(id: string | undefined)
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                <i className='fas fa-book' /> {title}
                {/* <span style={{ float: 'right' }} className={`badge ${rating < 3 ? 'badge-danger' : 'badge-success'}`}>{rating}</span> */}
                <span style={{ float: 'right', color: '#ebcc20' }}>
                    <RatingStars rating={rating} />
                </span>
                <br />
                <span style={{ float: 'right' }}>
                    <small className='text-xsm'>{bookReviewText}</small>
                </span>
                <ul className='list'>
                    {/* {author && ( */}
                    {/* // <i className='fas fa-envelope-open' /> */}
                    {/* <i className='fas fa-user-tie' /> {author} */}
                    {/* )} */}
                    <li>
                        <i className='fas fa-pen' /> {author}
                    </li>
                    <li>
                        <i className='fas fa-calendar-alt' /> {publicationYear}
                        {/* <i className='fas fa-calendar' /> {publicationYear} */}
                    </li>
                    <li>
                        {/* <i className='fas fa-tags' /> {genre} */}
                        {/* <i className='fas fa-tag' /> {genre} */}
                        <i className='fas fa-list' /> {genre}
                        {/* <i className='fas fa-film' /> {genre} */}
                        {/* <i className='fas fa-music' /> {genre} */}
                    </li>
                </ul>
                <p>
                    <button className='btn btn-dark btn-sm' onClick={onEdit}>Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
                </p>
            </h3>
        </div>
    )
}

export default BookItem
