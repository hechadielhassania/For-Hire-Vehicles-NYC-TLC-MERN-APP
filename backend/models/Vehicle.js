// backend/models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  active: String,
  vehicle_license_number: String,
  name: String,
  license_type: String,
  expiration_date: Date,
  permit_license_number: String,
  dmv_license_plate_number: String,
  vehicle_vin_number: String,
  wheelchair_accessible: String,
  vehicle_year: String,
  base_number: String,
  base_name: String,
  base_type: String,
  veh: String,
  base_telephone_number: String,
  base_address: String,
  reason: String,
  last_date_updated: Date,
  last_time_updated: String
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
