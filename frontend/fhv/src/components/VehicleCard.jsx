import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaIdBadge, FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaCopy } from 'react-icons/fa';

const VehicleCard = ({ vehicle }) => {
  const { active, vehicle_license_number, name, expiration_date, dmv_license_plate_number, vehicle_year, base_name, base_telephone_number, base_address } = vehicle;

  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    setCopiedField(content);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };
  

  return (
    <>
    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <Link to={`/drivers/${vehicle_license_number}`} className="text-yellow-500 hover:underline">
            {name}
          </Link>
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {base_name}
        </p>
    </div>
    <div className="border-t border-gray-200">
        <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    License Plate
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {dmv_license_plate_number}
                  <button onClick={() => copyToClipboard(dmv_license_plate_number)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === dmv_license_plate_number && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Expiration Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(expiration_date).toLocaleDateString()}
                  <button onClick={() => copyToClipboard(expiration_date)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === expiration_date && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Vehicle Year
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {vehicle_year}
                    <button onClick={() => copyToClipboard(vehicle_year)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === vehicle_year && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Link to={`tel:${base_telephone_number}`} target='_blank' className="text-blue-500 hover:underline">
                  {base_telephone_number}
                  </Link>
                  <button onClick={() => copyToClipboard(base_telephone_number)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === base_telephone_number && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">  
                  <Link to={`https://maps.google.com/?q=${base_address}`} target='_blank' className="text-blue-500 hover:underline">
                    {base_address}
                  </Link>
                  <button onClick={() => copyToClipboard(base_address)} className="ml-2 focus:outline-none text-gray-500 hover:text-gray-700 float-end">
                  <FaCopy />
                </button>
                {copiedField === base_address && <span className="ml-2 text-green-500">Copied!</span>}
                </dd>
            </div>
        </dl>
    </div>
</div>

    </>
  );
};

export default VehicleCard;
