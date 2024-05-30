import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ vehicleLicenseNumber }) => {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [editedReviewText, setEditedReviewText] = useState('');
    const [editedRating, setEditedRating] = useState(1);

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
    }, [vehicleLicenseNumber]);

    const startEditing = (review) => {
        setEditingReview(review);
        setEditedReviewText(review.review_text);
        setEditedRating(review.rating);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/api/reviews/${editingReview._id}`, {
                review_text: editedReviewText,
                rating: editedRating
            });
            setEditingReview(null);
            fetchReviews();
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:3000/api/reviews/${reviewId}`);
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    if (!reviews || reviews.length === 0) {
        return <div className="text-center mt-6">No reviews available for this driver.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Driver Reviews</h2>
            {reviews.map(review => (
                <div key={review._id} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                    {editingReview && editingReview._id === review._id ? (
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="editedReviewText">Edit Review</label>
                                <textarea
                                    id="editedReviewText"
                                    value={editedReviewText}
                                    onChange={(e) => setEditedReviewText(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="editedRating">Rating</label>
                                <input
                                    id="editedRating"
                                    type="number"
                                    value={editedRating}
                                    onChange={(e) => setEditedRating(e.target.value)}
                                    min="1"
                                    max="5"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingReview(null)}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <h3 className="text-lg font-semibold">{review.reviewer_name}</h3>
                            <p className="text-gray-700">{review.review_text}</p>
                            <p className="text-gray-500">Rating: {review.rating}</p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => startEditing(review)}
                                    className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteReview(review._id)}
                                    className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
