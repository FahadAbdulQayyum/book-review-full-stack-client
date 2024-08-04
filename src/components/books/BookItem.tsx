import { FC, useContext } from 'react'
import { Book } from '../../context/book/BookState'
import RatingStars from '../ratingStars/RatingStarts';

import ContactContext from '../../context/book/bookContext';
interface BookProps {
    book: Book
}

const BookItem: FC<BookProps> = ({ book }) => {

    const { deleteBook, setCurrent, clearCurrent } = useContext(ContactContext)

    const { _id, title, author, publicationYear, genre, bookReviewText, rating } = book;

    const onDelete = () => {
        deleteBook(_id)
        clearCurrent()
    }

    const onEdit = () => {
        setCurrent(book)
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                <span className='border'>
                    <i className='fas fa-book' />
                </span>
                {title}
                <span style={{ float: 'right', color: '#ebcc20' }}>
                    <RatingStars rating={rating} />
                </span>
                <br />
                <span style={{ float: 'right' }}>
                    <small className='text-xsm'>{bookReviewText}</small>
                </span>
                <ul className='list'>
                    <li>
                        <span className='border'>
                            <i className='fas fa-pen' />
                        </span>
                        {author}
                    </li>
                    <li>
                        <span className='border'>
                            <i className='fas fa-calendar-alt' />
                        </span>
                        {publicationYear}
                    </li>
                    <li>
                        <span className='border'>
                            <i className='fas fa-list' />
                        </span>
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
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
