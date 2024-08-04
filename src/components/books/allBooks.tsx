import React, { useContext, useEffect } from 'react'
import BookContext from '../../context/book/bookContext'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import { useNavigate } from 'react-router-dom'
import RatingStars from '../ratingStars/RatingStarts'

// const AllBooks = () => {
const AllBooks = (props: any) => {

    const navigate = useNavigate()

    const { setAlert } = useContext(AlertContext)
    const { error, clearErrors, isAuthenticated } = useContext(AuthContext)
    const { allBooks, getAllBooks } = useContext(BookContext)

    useEffect(() => {
        if (isAuthenticated) {
            // console.log('I\'m in login pageee', props)
            console.log('I\'m in login pageee')
            // props?.history?.push('/')
            navigate('/')
        }

        if (error === '') {
            setAlert(error, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
        // }, [])
    }, [error, isAuthenticated, props?.history])


    useEffect(() => {
        getAllBooks()
        // console.log('allBooksss', allBooks)
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {allBooks.map(v => <>
                <div className='card bg-light'>
                    <h3 className='text-primary text-left'>
                        <i className='fas fa-book' /> {v.title}
                        {/* <span style={{ float: 'right' }} className={`badge ${rating < 3 ? 'badge-danger' : 'badge-success'}`}>{rating}</span> */}
                        <span style={{ float: 'right', color: '#ebcc20' }}>
                            <RatingStars rating={v.rating} />
                        </span>
                        <br />
                        <span style={{ float: 'right' }}>
                            <small className='text-xsm'>{v.bookReviewText}</small>
                        </span>
                        <ul className='list'>
                            {/* {author && ( */}
                            {/* // <i className='fas fa-envelope-open' /> */}
                            {/* <i className='fas fa-user-tie' /> {author} */}
                            {/* )} */}
                            <li>
                                <i className='fas fa-pen' /> {v.author}
                            </li>
                            <li>
                                <i className='fas fa-calendar-alt' /> {v.publicationYear}
                                {/* <i className='fas fa-calendar' /> {publicationYear} */}
                            </li>
                            <li>
                                {/* <i className='fas fa-tags' /> {genre} */}
                                {/* <i className='fas fa-tag' /> {genre} */}
                                <i className='fas fa-list' /> {v.genre}
                                {/* <i className='fas fa-film' /> {genre} */}
                                {/* <i className='fas fa-music' /> {genre} */}
                            </li>
                        </ul>
                        {/* <p>
                            <button className='btn btn-dark btn-sm' onClick={onEdit}>Edit</button>
                            <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
                        </p> */}
                    </h3>
                </div>
            </>)}
        </div>
    )
}

export default AllBooks
