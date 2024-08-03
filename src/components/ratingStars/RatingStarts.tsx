import React from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome is imported

interface RatingStarsProps {
    rating: number; // Rating value from 0 to 5 (can be a float for half stars)
    maxRating?: number; // Optional: Max rating value (default is 5)
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxRating = 5 }) => {
    const stars = [];

    // Iterate through possible star positions
    for (let i = 1; i <= maxRating; i++) {
        if (rating >= i) {
            stars.push(<i key={i} className="fas fa-star yl"></i>); // Full star
        } else if (rating >= i - 0.5) {
            stars.push(<i key={i} className="fas fa-star-half-alt yl"></i>); // Half star
        } else {
            stars.push(<i key={i} className="far fa-star yl"></i>); // Empty star
        }
    }

    return <div className="rating-stars">{stars}</div>;
};

export default RatingStars;
