import { useState } from 'react';
import './ReservationCard.css';

const ReservationCard = ({ pricePerNight = 150 }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0
  });

  const handleGuestChange = (type, operation) => {
    setGuests(prev => {
      const newValue = operation === 'increase' ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      return { ...prev, [type]: newValue };
    });
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <div className="reservation-card">
      <h2>What this place offers</h2>
      
      <ul className="amenities-list">
        <li>A beach view</li>
        <li><strong>{pricePerNight} $</strong> Night</li>
      </ul>
      
      <div className="date-selector">
        <div className="date-input">
          <label>Check in</label>
          <input 
            type="date" 
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        
        <div className="date-input">
          <label>Check out</label>
          <input 
            type="date" 
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
      </div>
      
      <div className="guest-selector">
        <div className="guest-summary" onClick={() => setShowGuestSelector(!showGuestSelector)}>
          <span>Guests</span>
          <span>{totalGuests} guest{totalGuests !== 1 ? 's' : ''}</span>
        </div>
        
        {showGuestSelector && (
          <div className="guest-options">
            <div className="guest-option">
              <div>
                <span>Adults</span>
              </div>
              <div className="guest-counter">
                <button 
                  onClick={() => handleGuestChange('adults', 'decrease')}
                  disabled={guests.adults <= 1}
                >
                  −
                </button>
                <span>{guests.adults}</span>
                <button onClick={() => handleGuestChange('adults', 'increase')}>
                  +
                </button>
              </div>
            </div>
            
            <div className="guest-option">
              <div>
                <span>Children</span>
              </div>
              <div className="guest-counter">
                <button 
                  onClick={() => handleGuestChange('children', 'decrease')}
                  disabled={guests.children <= 0}
                >
                  −
                </button>
                <span>{guests.children}</span>
                <button onClick={() => handleGuestChange('children', 'increase')}>
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <button className="reserve-button">Reserve</button>
    </div>
  );
};

export default ReservationCard; 