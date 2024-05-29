import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import RatingStars from 'react-icons';


const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [driverName, setDriverName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { driverName, rating, comment };
    axios.post('http://localhost:5000/api/reviews', newReview)
      .then(response => {
        setReviews([...reviews, response.data]);
        setDriverName('');
        setRating(0);
        setComment('');
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter(review => review._id !== id));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Reviews</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" placeholder="Driver's Name" value={driverName} onChange={(e) => setDriverName(e.target.value)} className="border p-2 mb-2" required />
        {/* <RatingStars count={5} size={24} value={rating} onChange={(newRating) => setRating(newRating)} className="mb-2" /> */}
        <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} className="border p-2 mb-2" required></textarea>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Review</button>
      </form>
      <div>
        {reviews.map(review => (
          <div key={review._id} className="border p-4 mb-4">
            <h3 className="text-lg font-semibold">{review.driverName}</h3>
            {/* <RatingStars count={5} size={24} value={review.rating} edit={false} className="mb-2" /> */}
            <p>{review.comment}</p>
            <button onClick={() => handleDelete(review._id)} className="bg-red-500 text-white py-1 px-2 rounded mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
