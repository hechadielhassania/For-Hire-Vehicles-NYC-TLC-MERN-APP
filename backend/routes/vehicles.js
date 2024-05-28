// backend/routes/vehicles.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get vehicle by license number
router.get('/:licenseNumber', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ vehicle_license_number: req.params.licenseNumber });
    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
