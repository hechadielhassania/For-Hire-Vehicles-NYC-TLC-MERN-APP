import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { SlActionRedo } from "react-icons/sl";

const ReviewsPage = () => {
    const [reviewsByDriver, setReviewsByDriver] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reviews');
                console.log('Fetched reviews:', response.data);

                // Group reviews by driver
                const reviewsMap = response.data.reduce((acc, review) => {
                    const driverId = review.driver.vehicle_license_number;
                    if (!acc[driverId]) {
                        acc[driverId] = {
                            driver: review.driver,
                            reviews: []
                        };
                    }
                    // Ensure unique reviews
                    const existingReviewIndex = acc[driverId].reviews.findIndex(r => r._id === review._id);
                    if (existingReviewIndex === -1) {
                        acc[driverId].reviews.push(review);
                    }
                    return acc;
                }, {});

                setReviewsByDriver(reviewsMap);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <>
        <section className="pt-8 mt-10 mb-3">
        <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl">
            Explore All Driver Reviews in NYC
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
            Read what riders have to say about their experiences with NYC taxi drivers. Your feedback helps improve the service and recognize the best drivers in the city.
            </p>
        </div>
        </section>
        <div className="max-w-7xl mx-auto py-8">
            {Object.values(reviewsByDriver).map((driverGroup) => (
                <div key={driverGroup.driver.vehicle_license_number} className="bg-white shadow-md rounded-lg p-10 mb-4">
                    <div className="">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            <Link to={`/drivers/${driverGroup.driver.vehicle_license_number}`} className="text-black hover:underline">
                                {driverGroup.driver.name}
                                <SlActionRedo className="ml-2 float-right text-gray-500" />
                            </Link>
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-amber-500 my-7">
                            {driverGroup.driver.base_name}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {driverGroup.reviews.map((review) => (
                            <div key={review._id} className="bg-white shadow-md rounded-lg p-6">
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
            ))}
        </div>
        </>
    );
};

export default ReviewsPage;
