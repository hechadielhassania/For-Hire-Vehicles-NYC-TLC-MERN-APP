import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import { UserProvider } from './context/UserContext';
import DriverDetails from './components/DriverDetails';
import ReviewsPage from './components/ReviewsPage.jsx';
import TopDrivers from './components/TopDrivers.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<ReviewsPage />} /> {/* Ensure the path matches the driver ID parameter */}
          <Route path="/drivers" element={<TopDrivers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/drivers/:id" element={<DriverDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
