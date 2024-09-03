import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import Button from '../components/Button';
import ReviewModal from '../components/ReviewModal';
import StarRating from '../components/StarRating';

const Reviews = () => {
    const [showModal, setShowModal] = useState(false);
    const [newreview, setNewreview] = useState({
        meal: '',
        date: '',
        review: '',
        rating: 0,
    });


    const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("cred")).admin);

    // console.log(JSON.parse(localStorage.getItem("userCred")).admin)
    const userReviews = [
        {
            "meal": "user-Breakfast",
            "date": "28/11/2023",
            "review": "The breakfast options were delicious and satisfying. I especially enjoyed the variety and freshness of the food. The service was prompt, and the overall experience was fantastic.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Lunch",
            "date": "28/11/2023",
            "review": "Lunch was a delightful experience. The flavors were well-balanced, and the portions were generous. The staff was courteous, creating a pleasant atmosphere. Highly recommended!",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Dinner",
            "date": "28/11/2023",
            "review": "Dinner exceeded my expectations. The dishes were flavorful and beautifully presented. The ambiance was lovely, making it a perfect dining experience.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Snacks",
            "date": "28/11/2023",
            "review": "The snacks were a delightful treat. A perfect combination of sweet and savory options. The quality of ingredients was evident, and I thoroughly enjoyed my snack time.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Breakfast",
            "date": "29/11/2023",
            "review": "Another wonderful breakfast experience. The freshness of ingredients and the attention to detail make this place stand out. I look forward to starting my day here.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Lunch",
            "date": "29/11/2023",
            "review": "Lunch was disappointing. The food lacked flavor, and the service was slow. Not recommended for a pleasant lunch experience.",
            "ratings": "⭐"
        },
        {
            "meal": "Dinner",
            "date": "29/11/2023",
            "review": "Dinner was a gastronomic journey. The diverse menu and impeccable flavors make this place a standout choice for an evening meal. Highly recommended for food enthusiasts.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Snacks",
            "date": "29/11/2023",
            "review": "The snacks were underwhelming. The flavors were not as expected, and the variety was limited. Disappointed with the snack options.",
            "ratings": "⭐"
        },
        {
            "meal": "Breakfast",
            "date": "30/11/2023",
            "review": "Yet another fantastic breakfast. The consistency in quality and the friendly staff make this place my go-to for a satisfying morning meal.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Lunch",
            "date": "30/11/2023",
            "review": "Lunch was mediocre. The food was average, and the service could be improved. Not the best choice for a satisfying lunch experience.",
            "ratings": "⭐"
        }
    ]

    const allReviews = [
        {
            "meal": "Admin-Breakfast",
            "date": "28/11/2023",
            "review": "The breakfast options were delicious and satisfying. I especially enjoyed the variety and freshness of the food. The service was prompt, and the overall experience was fantastic.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Breakfast",
            "date": "28/11/2023",
            "review": "The breakfast options were delicious and satisfying. I especially enjoyed the variety and freshness of the food. The service was prompt, and the overall experience was fantastic.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Lunch",
            "date": "28/11/2023",
            "review": "Lunch was a delightful experience. The flavors were well-balanced, and the portions were generous. The staff was courteous, creating a pleasant atmosphere. Highly recommended!",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Dinner",
            "date": "28/11/2023",
            "review": "Dinner exceeded my expectations. The dishes were flavorful and beautifully presented. The ambiance was lovely, making it a perfect dining experience.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Snacks",
            "date": "28/11/2023",
            "review": "The snacks were a delightful treat. A perfect combination of sweet and savory options. The quality of ingredients was evident, and I thoroughly enjoyed my snack time.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Breakfast",
            "date": "29/11/2023",
            "review": "Another wonderful breakfast experience. The freshness of ingredients and the attention to detail make this place stand out. I look forward to starting my day here.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Lunch",
            "date": "29/11/2023",
            "review": "Lunch was disappointing. The food lacked flavor, and the service was slow. Not recommended for a pleasant lunch experience.",
            "ratings": "⭐"
        },
        {
            "meal": "Dinner",
            "date": "29/11/2023",
            "review": "Dinner was a gastronomic journey. The diverse menu and impeccable flavors make this place a standout choice for an evening meal. Highly recommended for food enthusiasts.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Snacks",
            "date": "29/11/2023",
            "review": "The snacks were underwhelming. The flavors were not as expected, and the variety was limited. Disappointed with the snack options.",
            "ratings": "⭐"
        },
        {
            "meal": "Breakfast",
            "date": "30/11/2023",
            "review": "Yet another fantastic breakfast. The consistency in quality and the friendly staff make this place my go-to for a satisfying morning meal.",
            "ratings": "⭐⭐⭐⭐⭐"
        },
        {
            "meal": "Lunch",
            "date": "30/11/2023",
            "review": "Lunch was mediocre. The food was average, and the service could be improved. Not the best choice for a satisfying lunch experience.",
            "ratings": "⭐"
        }
    ]

    const reviews = isAdmin ? allReviews : userReviews;
    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("cred")).admin);
        setNewreview(reviews);
    }, [])

    const handleStarClick = (value) => {
    setNewreview((prevReview) => ({
      ...prevReview,
      rating: value,
    }));
  };

   
    

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewreview({
            meal: '',
            date: '',
            review: '',
        });
        setIsReviewModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewreview((prevreview) => ({
            ...prevreview,
            [name]: value,
        }));

    };

    const handleAddreview = () => {
        // Add validation logic if needed
        // reviews.push(newreview);
        closeModal();
        console.log(newreview);
    };

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const openReviewModal = (review) => {
        setSelectedReview(review);
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleEdit = (editedReview, editedRating) => {

        // Close the modal after editing
        closeModal();
    }



    return (
        <div className="flex h-screen overflow-hidden pb-4">
            <SideNavbar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <div className="flex-1  overflow-y-auto overflow-x-hidden bg-gray-200 py-16 px-4">
                    <div className="text-right mx-4 mb-8 lg:mb-4 font-bold">
                        <div className="text-3xl">Reviews</div>
                    </div>
                    {
                        isAdmin ? "" :
                            <Button
                                value="Write Review/ Rate"
                                className="bg-red-400 text-white hover:bg-red-500 focus:ring-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                onClick={() => openModal()}
                            />
                    }

                    <div className=' text-2xl font-bold mt-6'>
                        {isAdmin ? "Meal Reviews by Students" : "Your Reviews"}
                    </div>

                    <div>
                        {reviews.map((obj, index) => (
                            <div key={obj.date} onClick={() => openReviewModal(obj)} className="w-full rounded-lg shadow-sm text-left p-4 bg-white mt-4">
                                <div className='text-left justify-between grid grid-cols-2'>
                                    <div>{obj.date}</div>
                                    <div className='text-right'>{obj.ratings}</div>
                                </div>
                                <div className='font-bold'>{obj.meal}</div>
                                <div className='grid grid-cols-2 justify-between '>
                                    <div>{obj.review.length > 50 ? `${obj.review.substring(0, 50)}...` : obj.review}</div>


                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {!showModal && isReviewModalOpen && (
                <ReviewModal
                    reviewDetails={selectedReview}
                    onClose={closeReviewModal}
                    onEdit={handleEdit}
                />
            )}



            {showModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    New review
                                </h3>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700">Meal</label>
                                    <select
                                        name="meal"
                                        value={newreview.meal}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select meal</option>
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="snacks">Snacks</option>
                                        <option value="dinner">Dinner</option>
                                    </select>
                                    <label className="block text-sm font-medium text-gray-700 mt-2">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newreview.date}
                                        onChange={handleInputChange}
                                        className="w-full mt-2 p-2 border rounded"
                                    />
                                    <label className="block text-sm font-medium text-gray-700 mt-2">Review</label>
                                    <textarea
                                        name="review"
                                        value={newreview.review}
                                        onChange={handleInputChange}
                                        placeholder="Review"
                                        className="w-full mt-2 p-2 border rounded"
                                    />
                                    <label className="block text-sm font-medium text-gray-700 mt-2">Rating</label>
                                    <StarRating value={newreview.rating} onClick={handleStarClick} />

                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={handleAddreview}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Add review
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
