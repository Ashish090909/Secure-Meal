// ReviewModal.js

import React, { useState } from 'react';
import Button from './Button'; // Assuming you have a Button component

const ReviewModal = ({ reviewDetails, onClose, onEdit }) => {
  const [editedReview, setEditedReview] = useState(reviewDetails.review);
  const [editedRating, setEditedRating] = useState(reviewDetails.ratings);

  const handleEdit = () => {
    // Implement logic to update the review and rating
    // You can use the onEdit prop to pass the updated data to the parent
    onEdit(editedReview, editedRating);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <div className="mb-4">
          <div className='font-bold'>{reviewDetails.meal}</div>
          <div className='text-gray-600'>{reviewDetails.date}</div>
        </div>
        <div className="mb-4">
          <div className='flex justify-center'>
            <div className=''>{reviewDetails.ratings}</div>
            {/* <Button
              value="Edit"
              className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ml-2"
              onClick={handleEdit}
            /> */}
          </div>
          <div>{reviewDetails.review}</div>
        </div>
        <div className="text-right">
          <Button
            value="Close"
            className="bg-gray-400 text-white hover:bg-gray-500 focus:ring-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
