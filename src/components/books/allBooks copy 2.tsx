import React, { useContext, useEffect, useState } from 'react'
import BookContext from '../../context/book/bookContext'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import { useNavigate } from 'react-router-dom'
import RatingStars from '../ratingStars/RatingStarts'
import { formProps } from '../../context/auth/AuthState'

// const AllBooks = () => {
const AllBooks = (props: any) => {

    const navigate = useNavigate()

    // const [bookId, setBookId] = useState<formProps[]>([])
    const [bookId, setBookId] = useState<string[]>([])

    const { setAlert } = useContext(AlertContext)
    const { error, clearErrors, user, isAuthenticated, reviews } = useContext(AuthContext)
    // const { allBooks, getAllBooks, reviewLike, reviews } = useContext(BookContext)
    const { allBooks, getAllBooks, reviewLike } = useContext(BookContext)

    // const { reviews } = user

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         // console.log('I\'m in login pageee', props)
    //         console.log('I\'m in login pageee')
    //         // props?.history?.push('/')
    //         navigate('/home')
    //     }

    //     if (error === '') {
    //         setAlert(error, 'danger')
    //         clearErrors()
    //     }
    //     // eslint-disable-next-line
    //     // }, [])
    // }, [error, isAuthenticated, props?.history])


    useEffect(() => {
        getAllBooks()
        // user !== null && user.reviews && console.log('user.reviewsss', user.reviews)

        reviews && reviews.map(rv => setBookId([rv.bookId]))

        // user && setBookId(user)
        // user !== null && user.reviews && setBookId(user.reviews)
        // console.log('allBooksss', allBooks)
        console.log('reviewss....pre')
        console.log('reviewss....', reviews)
        // eslint-disable-next-line
        // }, [])
    }, [reviews])
    // }, [user])

    const onLike = (id: string) => {
        reviewLike(id)
    }

    const getReviewStatus = (bookId: string, reviews: {
        bookId: string,
        like: boolean,
        _id: boolean,
    }[] | null) => {
        const review = reviews && reviews.find(rv => rv.bookId === bookId);
        return review ? review.like : null;
    };

    return (
        <div>
            {allBooks.map(v => {
                const likeStatus = getReviewStatus(v._id, reviews);
                return (<div className='card bg-light'>
                    <h3 className='text-primary text-left'>
                        <span className='border'>
                            <i className='fas fa-book' />
                        </span>
                        {v.title}

                        {/* <span style={{ float: 'right' }} className={`badge ${ rating< 3? 'badge-danger' : 'badge-success'}`}>{rating}</span> */}
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
                                <span className='border'>
                                    <i className='fas fa-pen' />
                                </span>
                                {v.author}
                            </li>
                            <li>
                                <span className='border'>
                                    <i className='fas fa-calendar-alt' />
                                </span>
                                {v.publicationYear}
                                {/* <i className='fas fa-calendar' /> {publicationYear} */}
                            </li>
                            <li>
                                {/* <i className='fas fa-tags' /> {genre} */}
                                {/* <i className='fas fa-tag' /> {genre} */}
                                <span className='border'>
                                    <i className='fas fa-list' />
                                </span>
                                {v.genre.charAt(0).toUpperCase() + v.genre.slice(1)}
                                {/* <i className='fas fa-film' /> {genre} */}
                                {/* <i className='fas fa-music' /> {genre} */}
                            </li>
                        </ul>
                        <h3>{v._id}</h3>
                        {/* <h1>{user && user?.reviews && user?.reviews?.bookId}</h1> */}
                        {/* <h1>{user && user.reviews?._id}</h1> */}
                        {/* <h1>{reviews && reviews.map(v => v.bookId)}</h1> */}
                        {/* <h1>{bookId.find(rv => rv === v._id)}</h1> */}
                        <h1>{bookId}</h1>
                        {isAuthenticated && (likeStatus === true ? (
                            <button className='btn btn-danger btn-sm btn-block' onClick={() => onLike(v._id)}>Dislike</button>
                        ) : likeStatus === false ? (
                            <button className='btn btn-dark btn-sm btn-block' onClick={() => onLike(v._id)}>Like</button>
                        ) : (
                            <>
                                <button className='btn btn-dark btn-sm btn-block' onClick={() => onLike(v._id)}>Like</button>
                                <button className='btn btn-danger btn-sm btn-block' onClick={() => onLike(v._id)}>Dislike</button>
                            </>
                        ))}
                        {/* <h1>{user && user?.reviews?.bookId}</h1> */}
                        {/* {reviews && reviews.map(vv => vv.bookId === v._id ? vv.like === true ? <button>Liked</button> : <button>Not Liked</button> : <button>Not Review</button>)} */}
                        {isAuthenticated ? <p className='side-by-side'>
                            {reviews && reviews.map(rv => {
                                if (rv.bookId === v._id) {
                                    if (rv.like) {
                                        return (
                                            <button className='btn btn-danger btn-sm btn-block' onClick={() => onLike(v._id)}>Dislike</button>
                                        )
                                    }
                                    else {
                                        return (
                                            <button className='btn btn-dark btn-sm btn-block' onClick={() => onLike(v._id)}>Like</button>
                                        )
                                    }
                                }
                                // else {
                                //     return (
                                //         <>
                                //             <button className='btn btn-dark btn-sm btn-block'>Like</button>
                                //             <button className='btn btn-danger btn-sm btn-block'>Dislike</button>
                                //         </>
                                //     )
                                // }
                            }
                            )}
                            (<>
                                <button className='btn btn-dark btn-sm btn-block'>Like</button>
                                <button className='btn btn-danger btn-sm btn-block'>Dislike</button>
                            </>)
                        </p>
                            : <button className='btn btn-dark btn-sm btn-block' >Login to Vote</button>
                        }
                    </h3>
                </div>)
            }
            )
            }
        </div >
    )
}

export default AllBooks
