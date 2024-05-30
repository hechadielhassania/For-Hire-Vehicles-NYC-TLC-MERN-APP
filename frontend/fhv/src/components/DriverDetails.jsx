import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import ReviewList from './ReviewList';
import AddReview from './AddReview';

const DriverDetails = () => {
    const [copiedField, setCopiedField] = useState(null);
    const { id } = useParams();
    const [driver, setDriver] = useState(null);
    const [reviews, setReviews] = useState([]);

    const copyToClipboard = (content) => {
        navigator.clipboard.writeText(content);
        setCopiedField(content);
        setTimeout(() => {
            setCopiedField(null);
        }, 2000);
    };

    const fetchDriverDetails = async () => {
        try {
            const response = await fetch(`https://data.cityofnewyork.us/resource/8wbx-tsch.json?vehicle_license_number=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch driver details');
            }
            const data = await response.json();
            if (data.length > 0) {
                setDriver(data[0]);
            } else {
                throw new Error('Driver not found');
            }
        } catch (error) {
            console.error('Error fetching driver details:', error);
        }
    };

    const fetchDriverReviews = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/reviews/${id}`);
            const reviewsData = await response.json();
            setReviews(reviewsData);
        } catch (error) {
            console.error('Error fetching driver reviews:', error);
        }
    };

    useEffect(() => {
        fetchDriverDetails();
        fetchDriverReviews();
    }, [id]);

    if (!driver) {
        return (
            <div className="text-center">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="inline mt-10 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-amber-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="py-10 my-10 ">
                <div className=" px-6 mx-auto w-full flex justify-center ">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-9/12">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {driver.name}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-amber-500">
                                {driver.base_name}
                            </p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        DMV License Plate Number
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {driver.dmv_license_plate_number}
                                        <button
                                            onClick={() =>
                                                copyToClipboard(driver.dmv_license_plate_number)
                                            }
                                            className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end"
                                        >
                                            <FaCopy />
                                        </button>
                                        {copiedField === driver.dmv_license_plate_number && (
                                            <span className="ml-2 text-green-500">Copied!</span>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Vehicle License Number
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {driver.vehicle_license_number}
                                        <button
                                            onClick={() =>
                                                copyToClipboard(driver.vehicle_license_number)
                                            }
                                            className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end"
                                        >
                                            <FaCopy />
                                        </button>
                                        {copiedField === driver.vehicle_license_number && (
                                            <span className="ml-2 text-green-500">Copied!</span>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Expiration Date
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {new Date(driver.expiration_date).toLocaleDateString()}
                                        <button
                                            onClick={() =>
                                                copyToClipboard(driver.expiration_date)
                                            }
                                            className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end"
                                        >
                                            <FaCopy />
                                        </button>
                                        {copiedField === driver.expiration_date && (
                                            <span className="ml-2 text-green-500">Copied!</span>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Vehicle VIN Number
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {driver.vehicle_vin_number}
                                        <button
                                            onClick={() =>
                                                copyToClipboard(driver.vehicle_vin_number)
                                            }
                                            className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end"
                                        >
                                            <FaCopy />
                                        </button>
                                        {copiedField === driver.vehicle_vin_number && (
                                            <span className="ml-2 text-green-500">Copied!</span>
                                        )}
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Vehicle Year
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {driver.vehicle_year}
                                        <button
                                            onClick={() => copyToClipboard(driver.vehicle_year)}
                                            className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end"
                                        >
                                            <FaCopy />
                                        </button>
                                        {copiedField === driver.vehicle_year && (
                                            <span className="ml-2 text-green-500">Copied!</span>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Phone
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <Link
                                            to={`tel:${driver.base_telephone_number}`}
                                            target="_blank"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {driver.base_telephone_number}
                                        </Link>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(driver.base_telephone_number)
                                            }
                                            className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end"
                                        >
                                            <FaCopy />
                                        </button>
                                        {copiedField === driver.base_telephone_number && (
                                            <span className="ml-2 text-green-500">Copied!</span>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <Link
                                            to={`https://maps.google.com/?q=${driver.base_address}`}
                                            target="_blank"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {driver.base_address}
                                        </Link>
                                        <button
                                            onClick={() => copyToClipboard(driver.base_address)}
                                            className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end"
                                        >
                                            <FaCopy />
                                        </button>
                                        {copiedField === driver.base_address && (
                                            <span className="ml-2 text-green-500">Copied!</span>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        {/* Reviews sections */}
                        <div className='py-10'>
                            {/* <ReviewList vehicleLicenseNumber={driver.dmv_license_plate_number} /> */}
                            <AddReview vehicleLicenseNumber={driver.dmv_license_plate_number} onReviewAdded={fetchDriverReviews} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DriverDetails;
