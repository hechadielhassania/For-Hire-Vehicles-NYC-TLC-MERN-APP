
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { user, driver, rating, comment } = req.body;
    const review = new Review({ user, driver, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get reviews by driver ID
router.get('/driver/:driverId', async (req, res) => {
  try {
    const reviews = await Review.find({ driver: req.params.driverId });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other routes for updating and deleting reviews can be added similarly

module.exports = router;
