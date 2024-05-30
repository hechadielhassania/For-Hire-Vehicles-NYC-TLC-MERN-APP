import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const TopDrivers = () => {
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
                    acc[driverId].reviews.push(review);
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
            Meet the Top Drivers in NYC
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
            Discover the best drivers in New York City as rated by riders. Your reviews help highlight excellent service and ensure a better ride experience for everyone.
            </p>
        </div>
        </section>
        <div className="max-w-7xl mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.values(reviewsByDriver).map((driverGroup) => (
                    <div key={driverGroup.driver.vehicle_license_number} className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link to={`/drivers/${driverGroup.driver.vehicle_license_number}`} className="text-lg font-medium text-gray-900 hover:underline">
                                    {driverGroup.driver.name}
                                </Link>
                            </div>
                            <Link to={`/drivers/${driverGroup.driver.vehicle_license_number}`} className="flex items-center">
                                <div className="flex">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} className="text-amber-500" />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-700">({driverGroup.reviews.length} reviews)</span>
                            </Link>
                        </div>
                        <div>
                            <p className="text-sm text-amber-500 py-2">{driverGroup.driver.base_name}</p>
                            <dl className='pt-4'>
                                <div className="bg-gray-50 px-4 py-5 flex justify-between ">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Vehicle License Number
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 ">
                                        {driverGroup.driver.vehicle_license_number}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">
                                        DMV License Plate Number
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 ">
                                        {driverGroup.driver.dmv_license_plate_number}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Vehicle Year
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 ">
                                        {driverGroup.driver.vehicle_year}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default TopDrivers;
