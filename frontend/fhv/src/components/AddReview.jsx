import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList'; // Ensure you have this imported

const AddReview = ({ vehicleLicenseNumber }) => {
    const [reviewerName, setReviewerName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [key, setKey] = useState(0); // State for the key

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/reviews/${vehicleLicenseNumber}`);
            setReviews(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setReviews([]);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [vehicleLicenseNumber, key]); // Add key to dependencies

    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = {
            vehicle_license_number: vehicleLicenseNumber,
            reviewer_name: reviewerName,
            review_text: reviewText,
            rating: rating,
        };
        try {
            await axios.post('http://localhost:3000/api/reviews', review);
            setReviewerName('');
            setReviewText('');
            setRating(1);
            setKey(key + 1); // Update the key to re-render the component
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div key={key}>
            <ReviewList vehicleLicenseNumber={vehicleLicenseNumber} />
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Add a Review</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="reviewerName">Your Name</label>
                        <input
                            id="reviewerName"
                            type="text"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            placeholder="Your name"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="reviewText">Your Review</label>
                        <textarea
                            id="reviewText"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Your review"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="rating">Rating</label>
                        <input
                            id="rating"
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            min="1"
                            max="5"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default AddReview;
