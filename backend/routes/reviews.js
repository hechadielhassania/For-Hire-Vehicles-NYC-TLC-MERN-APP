const express = require('express');
const router = express.Router();
const axios = require('axios');
const Review = require('../models/Review');

// Create a review
router.post('/reviews', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).send(review);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get reviews for a specific driver
router.get('/reviews/:vehicle_license_number', async (req, res) => {
    try {
        const reviews = await Review.find({ vehicle_license_number: req.params.vehicle_license_number });
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all reviews with driver details from NYC API
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        const driverDetailsPromises = reviews.map(async (review) => {
            try {
                const response = await axios.get(`https://data.cityofnewyork.us/resource/8wbx-tsch.json?dmv_license_plate_number=${review.vehicle_license_number}`);
                if (response.data && response.data.length > 0) {
                    const driverDetails = response.data[0]; // Assuming response data is an array
                    console.log(`Driver details found for vehicle license number: ${review.vehicle_license_number}`);
                    return {
                        ...review._doc,
                        driver: driverDetails
                    };
                } else {
                    console.log(`No driver details found for vehicle license number: ${review.vehicle_license_number}`);
                    return {
                        ...review._doc,
                        driver: null
                    };
                }
            } catch (err) {
                console.log(`Error fetching driver details for vehicle license number: ${review.vehicle_license_number}`, err.message);
                return {
                    ...review._doc,
                    driver: null
                };
            }
        });

        const reviewsWithDriverDetails = await Promise.all(driverDetailsPromises);
        res.send(reviewsWithDriverDetails);
    } catch (error) {
        console.log('Error fetching reviews:', error.message);
        res.status(500).send(error);
    }
});

// Update a review
router.patch('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!review) {
            return res.status(404).send();
        }
        res.send(review);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a review
router.delete('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).send();
        }
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
