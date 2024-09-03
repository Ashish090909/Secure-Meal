import React from "react";
const StarRating = ({ value, onClick }) => {
    const stars = [1, 2, 3, 4, 5];
  
    return (
      <div>
        {stars.map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-3xl ${
              star <= value ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onClick={() => onClick(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

export default StarRating