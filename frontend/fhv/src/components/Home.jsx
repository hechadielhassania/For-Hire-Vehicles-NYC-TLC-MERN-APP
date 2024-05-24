import React, { useEffect, useState } from 'react';
import VehicleCard from './VehicleCard';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5550/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterYear = (e) => {
    setFilterYear(e.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const searchString = searchTerm.toLowerCase();
    const matchesSearchTerm = vehicle.vehicle_license_number.includes(searchString) ||
                              vehicle.name.toLowerCase().includes(searchString);
    const matchesYearFilter = filterYear === '' || vehicle.vehicle_year === filterYear;
    return matchesSearchTerm && matchesYearFilter;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">For Hire Vehicles in NYC</h1>
      <div className="mb-4 flex flex-col md:flex-row gap-3">
        <div className="flex">
            <input type="text" placeholder="Search by name or license"
                className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500" value={searchTerm}
                onChange={handleSearch}
                />
            <button type="submit" className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
        </div>
        <select name="yearfilter"
            className="h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider" value={filterYear}
            onChange={handleFilterYear}>
            <option value="">Filter by year</option>
            {[...new Set(vehicles.map(vehicle => vehicle.vehicle_year))].sort().map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
        </select>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map(vehicle => (
          <VehicleCard key={vehicle.vehicle_license_number} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Home;
