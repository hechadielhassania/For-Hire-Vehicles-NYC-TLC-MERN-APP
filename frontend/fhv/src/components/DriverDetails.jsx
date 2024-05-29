import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';


const DriverDetails = () => {

  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    setCopiedField(content);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

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
    <>
    <section className=" flex items-center justify-center ">
      <div className="flex items-center justify-center px-6 mx-auto md:h-screen w-full ">
    <div className="bg-white  shadow overflow-hidden sm:rounded-lg basis-9/12">
    <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
            {driver.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-amber-500">
          {driver.base_name}
        </p>
    </div>
    <div className="border-t border-gray-200">
        <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  DMV License Plate Number 
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {driver.dmv_license_plate_number}
                  <button onClick={() => copyToClipboard(driver.dmv_license_plate_number)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === driver.dmv_license_plate_number && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                   Vehicle License Number 
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {driver.vehicle_license_number}
                  <button onClick={() => copyToClipboard(driver.vehicle_license_number)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === driver.vehicle_license_number && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Expiration Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(driver.expiration_date).toLocaleDateString()}
                  <button onClick={() => copyToClipboard(driver.expiration_date)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === driver.expiration_date && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                   Vehicle VIN Number  
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {driver.vehicle_vin_number}
                  <button onClick={() => copyToClipboard(driver.vehicle_vin_number)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === driver.vehicle_vin_number && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Vehicle Year
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {driver.vehicle_year}
                    <button onClick={() => copyToClipboard(driver.vehicle_year)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === driver.vehicle_year && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Link to={`tel:${driver.base_telephone_number}`} target='_blank' className="text-blue-500 hover:underline">
                  {driver.base_telephone_number}
                  </Link>
                  <button onClick={() => copyToClipboard(driver.base_telephone_number)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === driver.base_telephone_number && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">  
                  <Link to={`https://maps.google.com/?q=${driver.base_address}`} target='_blank' className="text-blue-500 hover:underline">
                    {driver.base_address}
                  </Link>
                  <button onClick={() => copyToClipboard(driver.base_address)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === driver.base_address && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
        </dl>
    </div>
</div>
</div>
</section>
    
    </>
  );
};

export default DriverDetails;
