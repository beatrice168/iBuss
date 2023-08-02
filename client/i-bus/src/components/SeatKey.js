import React from 'react';
// import './SeatSelector.css'; // Import your custom CSS file for styling

const SeatKey = () => {
  return (
    <div className="seat-key">
      <div className="key-item">
        <div className="seat booked"></div>
        <span>Booked</span>
      </div>
      <div className="key-item">
        <div className="seat selected"></div>
        <span>Selected</span>
      </div>
      <div className="key-item">
        <div className="seat available"></div>
        <span>Available</span>
      </div>
    </div>
  );
};

export default SeatKey;
