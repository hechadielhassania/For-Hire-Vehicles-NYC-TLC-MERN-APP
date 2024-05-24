import React from 'react';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">{vehicle.name}</h2>
      <p className="text-gray-600">License Type: {vehicle.license_type}</p>
      <p className="text-gray-600">Vehicle Year: {vehicle.vehicle_year}</p>
      <p className="text-gray-600">Base Name: {vehicle.base_name}</p>
      <p className="text-gray-600">Base Address: {vehicle.base_address}</p>
      <p className="text-gray-600">Wheelchair Accessible: {vehicle.wheelchair_accessible}</p>
      <p className="text-gray-600">VIN: {vehicle.vehicle_vin_number}</p>
      <p className="text-gray-600">Base Telephone: {vehicle.base_telephone_number}</p>
    </div>
  );
};

export default VehicleCard;
