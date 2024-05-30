const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    vehicle_license_number: { type: String, required: true },
    reviewer_name: { type: String, required: true },
    review_text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
