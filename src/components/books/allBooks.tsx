import { useContext, useEffect, useState } from 'react';
import BookContext from '../../context/book/bookContext';
import AuthContext from '../../context/auth/authContext';
import RatingStars from '../ratingStars/RatingStarts';

const AllBooks = () => {
    const { isAuthenticated, reviews, reviewUpdate, loadReviews, reviewsToShow } = useContext(AuthContext);
    const { allBooks, getAllBooks, reviewLike } = useContext(BookContext);
    const [revieww, setRevieww] = useState<{
        bookId: string;
        totalLikes: number;
        totalDislikes: number;
    }[] | null>(null);

    useEffect(() => {
        loadReviews();
        getAllBooks();
    }, [loadReviews, getAllBooks]);

    useEffect(() => {
        if (reviewsToShow) {
            setRevieww(reviewsToShow);
        }
        console.log('***', reviewsToShow)
    }, [reviewsToShow]);

    const getReviewStatus = (bookId: string) => {
        const review = reviews?.find((rv) => rv.bookId === bookId);
        return review ? review.like : null;
    };

    const onLike = (id: string) => {
        reviewLike(id);
        reviewUpdate(id);
    };

    const reviewsToShowOnCard = (id: string) => {
        const filtered = revieww && revieww.filter(d => d.bookId === id);

        return filtered && filtered.map(v => (
            <span key={v.bookId} style={{ float: 'right' }}>
                {/* <small className='text-xsm'><strong>{v.totalLikes}</strong> Liked</small> */}
                <small className='text-xsm text-primary'><strong>{v.totalLikes}</strong> <i className="fa fa-thumbs-up" /></small>
                {/* {" "} */}
                {" | "}
                {/* <small className='text-xsm'>{v.totalDislikes} Disiked</small> */}
                <small className='text-xsm text-danger'>{v.totalDislikes} <i className="fa fa-thumbs-down" /></small>
            </span>
        ));
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
                        <br />
                        <span className="straight">
                            {revieww ? reviewsToShowOnCard(v._id) : <div style={{ float: 'right' }}>Loading....</div>}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default AllBooks;
