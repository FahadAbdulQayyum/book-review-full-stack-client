import React from 'react';

interface RatingStarsProps {
    rating: number;
    maxRating?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxRating = 5 }) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        if (rating >= i) {
            stars.push(<i key={i} className="fas fa-star yl"></i>)
        } else if (rating >= i - 0.5) {
            stars.push(<i key={i} className="fas fa-star-half-alt yl"></i>)
        } else {
            stars.push(<i key={i} className="far fa-star yl"></i>)
        }
    }

    return <div className="rating-stars">{stars}</div>;
};

export default RatingStars;
