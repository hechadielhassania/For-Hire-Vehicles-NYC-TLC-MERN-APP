import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-100/50 border-t border-gray-200 py-6">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 lg:px-6">
        <Link to="/" className="flex items-center">
          <img src={logo} className="mr-3" alt="Logo" />
        </Link>
        <div className="text-center ">
          <p className="text-sm text-gray-500">
            &copy; 2023 All rights reserved.
          </p>
        </div>
        <div className="text-center ">
          <p className="text-sm text-gray-500">
            Created with <span className="text-red-500">&hearts;</span> by EL Hassania Hechadi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
