import React, { useState, useEffect } from 'react';

const DriverDetails = ({ match }) => {
  const [driver, setDriver] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('match:', match); // Log match object

    const fetchDriver = async () => {
      try {
        if (!match || !match.params || !match.params.vehicle_license_number) {
          throw new Error('Invalid parameter');
        }

        const apiUrl = `https://data.cityofnewyork.us/resource/8wbx-tsch.json?vehicle_license_number=${match.params.vehicle_license_number}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('Driver not found');
        }
        setDriver(data[0]); // Assuming the API returns an array and we want the first item
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDriver();

    return () => {
      // Cleanup code, if necessary
    };
  }, [match]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{driver.name}</h2>
      {/* Render other driver details here */}
    </div>
  );
};

export default DriverDetails;
