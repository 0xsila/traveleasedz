import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import axios from 'axios';
import { 
  FaWifi, 
  FaSwimmingPool, 
  FaSnowflake, 
  FaStar, 
  FaMapMarkerAlt, 
  FaArrowRight,
  FaParking,
  FaUsers
} from 'react-icons/fa';

const Rental = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi':
        return <FaWifi className="text-blue-500" />;
      case 'pool':
        return <FaSwimmingPool className="text-cyan-500" />;
      case 'air conditioning':
        return <FaSnowflake className="text-sky-500" />;
      case 'parking':
        return <FaParking className="text-gray-500" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/homes');
        setHomes(response.data.homes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch homes');
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Homes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {homes.map((home) => (
            <div
              key={home._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col"
            >
              <div className="relative h-40">
                <img
                  src={home.images[0]?.startsWith('/uploads') 
                    ? `http://localhost:5000${home.images[0]}`
                    : home.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={home.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-rose-600 shadow-sm">
                  {home.type}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-rose-600 transition-colors duration-300 line-clamp-1">
                    {home.title}
                  </h2>
                  <div className="flex items-center gap-1 text-amber-400">
                    <FaStar />
                    <span className="text-sm font-medium text-gray-700">{home.rating || '4.5'}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <FaMapMarkerAlt className="text-rose-500 mr-1" />
                  <span className="line-clamp-1">{home.location.wilaya}, {home.location.address}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {home.amenities.slice(0, 3).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs bg-gray-50 px-2 py-1 rounded-full"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                  {home.amenities.length > 3 && (
                    <div className="text-xs text-gray-500 px-2 py-1">
                      +{home.amenities.length - 3} more
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <FaUsers className="mr-1" />
                    <span>{home.guestsAllowed} guests</span>
                  </div>
                  {home.availableDates?.length > 0 && (
                    <span className="text-gray-400">•</span>
                  )}
                  {home.availableDates?.length > 0 && (
                    <span>Available: {formatDate(home.availableDates[0])} - {formatDate(home.availableDates[home.availableDates.length - 1])}</span>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="flex items-center mb-3">
                    <span className="text-lg font-bold text-rose-600">${home.pricePerNight.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-1">/ night</span>
                  </div>
                  <button
                    onClick={() => navigate(`/homes/${home._id}`)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    View Details
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rental; 