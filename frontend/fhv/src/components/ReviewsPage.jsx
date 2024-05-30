import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { SlActionRedo } from "react-icons/sl";

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reviews');
                console.log('Fetched reviews:', response.data);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-8">
            <h1 className="text-3xl font-semibold text-center mb-8">All Driver Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white shadow-md rounded-lg p-6">
                        {review.driver ? (
                            <>
                            <div className="py-5 ">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                <Link to={`/drivers/${review.driver.vehicle_license_number}`} className="text-black hover:underline">
                                    {review.driver.name}
                                    <SlActionRedo className="ml-2 float-right text-gray-500" />
                                </Link>
                                
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-amber-500">
                                    {review.driver.base_name}
                                </p>
                            </div>
                            </>
                        ) : (
                            <p className="text-gray-700 mb-2">Driver details not available</p>
                        )}
                        <p className="text-gray-700 mb-2">Review by: {review.reviewer_name}</p>
                        <p className="text-gray-700 mb-2">Review: {review.review_text}</p>
                        <div className="flex items-center mb-2">
                            <p className="text-gray-700 mr-2">Rating:</p>
                            <div className="flex">
                                {[...Array(review.rating)].map((_, index) => (
                                    <FaStar key={index} className="text-amber-500" />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm">Reviewed on: {new Date(review.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;
