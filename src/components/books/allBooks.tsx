import { useContext, useEffect } from 'react';
import BookContext from '../../context/book/bookContext';
import AuthContext from '../../context/auth/authContext';
import RatingStars from '../ratingStars/RatingStarts';

const AllBooks = () => {
    const { isAuthenticated, reviews, reviewUpdate } = useContext(AuthContext);
    const { allBooks, getAllBooks, reviewLike } = useContext(BookContext);

    useEffect(() => {
        getAllBooks();
    }, [getAllBooks]);

    const getReviewStatus = (bookId: string) => {
        const review = reviews?.find((rv) => rv.bookId === bookId);
        return review ? review.like : null;
    };

    const onLike = (id: string) => {
        reviewLike(id);
        reviewUpdate(id);
    };

    return (
        <div>
            {allBooks.map((v) => {
                const likeStatus = getReviewStatus(v._id);
                return (
                    <div className='card bg-light' key={v._id}>
                        <h3 className='text-primary text-left'>
                            <span className='border'>
                                <i className='fas fa-book' />
                            </span>
                            {v.title}

                            <span style={{ float: 'right', color: '#ebcc20' }}>
                                <RatingStars rating={v.rating} />
                            </span>
                            <br />
                            <span style={{ float: 'right' }}>
                                <small className='text-xsm'>{v.bookReviewText}</small>
                            </span>
                            <ul className='list'>
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
                                </li>
                                <li>
                                    <span className='border'>
                                        <i className='fas fa-list' />
                                    </span>
                                    {v.genre.charAt(0).toUpperCase() + v.genre.slice(1)}
                                </li>
                            </ul>
                            {isAuthenticated && (
                                <div>
                                    {likeStatus === true ? (
                                        <button className='btn btn-danger btn-sm btn-block' onClick={() => onLike(v._id)}>Dislike</button>
                                    ) : likeStatus === false ? (
                                        <button className='btn btn-dark btn-sm btn-block' onClick={() => onLike(v._id)}>Like</button>
                                    ) : (
                                        <div className='side-by-side'>
                                            <button className='btn btn-dark btn-sm btn-block' onClick={() => onLike(v._id)}>Like</button>
                                            <button className='btn btn-danger btn-sm btn-block' onClick={() => onLike(v._id)}>Dislike</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};

export default AllBooks;













// import { useContext, useEffect, useState } from 'react'
// import BookContext from '../../context/book/bookContext'
// import AuthContext from '../../context/auth/authContext'
// import AlertContext from '../../context/alert/alertContext'
// import RatingStars from '../ratingStars/RatingStarts'

// const AllBooks = (props: any) => {

//     const { isAuthenticated, reviews, reviewUpdate } = useContext(AuthContext)
//     const { allBooks, getAllBooks, reviewLike } = useContext(BookContext)


//     const getReviewStatus = (bookId: string, reviews: {
//         bookId: string,
//         like: boolean,
//         _id: boolean,
//     }[] | null) => {
//         const review = reviews && reviews.find(rv => rv?.bookId === bookId);
//         return review ? review?.like : null;
//     };

//     const onLike = (id: string) => {
//         reviewLike(id)
//         reviewUpdate(id)
//     }

//     useEffect(() => {
//         getAllBooks()
//         getReviewStatus
//     }, [reviews, getReviewStatus, onLike])


//     return (
//         <div>
//             {allBooks.map(v => {
//                 const likeStatus = getReviewStatus(v._id, reviews);
//                 return (<div className='card bg-light'>
//                     <h3 className='text-primary text-left'>
//                         <span className='border'>
//                             <i className='fas fa-book' />
//                         </span>
//                         {v.title}

//                         <span style={{ float: 'right', color: '#ebcc20' }}>
//                             <RatingStars rating={v.rating} />
//                         </span>
//                         <br />
//                         <span style={{ float: 'right' }}>
//                             <small className='text-xsm'>{v.bookReviewText}</small>
//                         </span>
//                         <ul className='list'>
//                             <li>
//                                 <span className='border'>
//                                     <i className='fas fa-pen' />
//                                 </span>
//                                 {v.author}
//                             </li>
//                             <li>
//                                 <span className='border'>
//                                     <i className='fas fa-calendar-alt' />
//                                 </span>
//                                 {v.publicationYear}
//                             </li>
//                             <li>
//                                 <span className='border'>
//                                     <i className='fas fa-list' />
//                                 </span>
//                                 {v.genre.charAt(0).toUpperCase() + v.genre.slice(1)}
//                             </li>
//                         </ul>
//                         {isAuthenticated && (likeStatus === true ? (
//                             <button className='btn btn-danger btn-sm btn-block' onClick={() => onLike(v._id)}>Dislike</button>
//                         ) : likeStatus === false ? (
//                             <button className='btn btn-dark btn-sm btn-block' onClick={() => onLike(v._id)}>Like</button>
//                         ) : (
//                             <div className='side-by-side'>
//                                 <button className='btn btn-dark btn-sm btn-block' onClick={() => onLike(v._id)}>Like</button>
//                                 <button className='btn btn-danger btn-sm btn-block' onClick={() => onLike(v._id)}>Dislike</button>
//                             </div>
//                         ))}
//                     </h3>
//                 </div>)
//             }
//             )
//             }
//         </div >
//     )
// }

// export default AllBooks
