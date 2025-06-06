import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Firstpart from './firstpart';
import HotelCardRow from './HotelCardRow';
import CarCardRow from './CarCardRow';
import RentalCardRow from './RentalCardRow';
import Secondpart from './second';
import lowla from "./assets/image/lowla.png";
import tania from "./assets/image/tania.png";
import thaltha from "./assets/image/thaltha.png";
import rab3a from "./assets/image/rab3a.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <Navbar />

      {/* First Part Section */}
      <div className="firstpart-container">
        <Firstpart />
      </div>

      {/* Main Content Section */}
      <div className="min-h-screen bg-[#F5F5F5] py-8">
        {/* Hotels Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Hotels</h2>
            <button 
              onClick={() => navigate('/hotel')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Hotels →
            </button>
          </div>
          <HotelCardRow />
        </div>

        {/* Cars Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <button 
              onClick={() => navigate('/car')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Cars →
            </button>
          </div>
          <CarCardRow />
        </div>

        {/* Rentals Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Rentals</h2>
            <button 
              onClick={() => navigate('/rental')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Rentals →
            </button>
          </div>
          <RentalCardRow />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="secondpart-container">
      <Secondpart />
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">TravelEase</h2>
            <p className="text-gray-600 text-sm">Your trusted travel company across Algeria</p>
          </div>
          
          <div className="flex flex-col items-end">
            <h3 className="font-medium text-gray-800 mb-2">Assistance</h3>
            <ul className="text-right">
              <li className="text-gray-600 text-sm mb-1">Helpdesk</li>
              <li className="text-gray-600 text-sm mb-1">Support team</li>
              <li className="text-gray-600 text-sm">User manual</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

