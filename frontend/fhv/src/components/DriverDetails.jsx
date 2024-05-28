import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DriverDetails = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    // Fetch driver details based on the ID from the URL
    const fetchDriverDetails = async () => {
      try {
        const response = await fetch(`https://data.cityofnewyork.us/resource/8wbx-tsch.json?vehicle_license_number=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch driver details');
        }
        const data = await response.json();
        if (data.length > 0) {
          setDriver(data[0]); // Assuming the response is an array with a single object
        } else {
          throw new Error('Driver not found');
        }
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    };

    fetchDriverDetails();
  }, [id]);

  if (!driver) {
    return <p>Loading...</p>;
  }

  // Render driver details
  return (
    <div>
      <h2>{driver.name}</h2>
      <p>License Plate: {driver.vehicle_license_number}</p>
      <p>Vehicle Model: {driver.vehicle_make} {driver.vehicle_model}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default DriverDetails;
