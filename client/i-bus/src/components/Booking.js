import React, { useState } from 'react';
// import './SeatSelector.css'; // Import your custom CSS file for styling
import SeatKey from './SeatKey';

const numRows = 5; // Number of rows of seats
const numCols = 6; // Number of columns of seats



const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const bookedSeats = [5, 12, 15];

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }
    // Check if the seat is already selected
    if (selectedSeats.includes(seatNumber)) {
      // Seat is selected, remove it from the selectedSeats array
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      // Seat is unselected, add it to the selectedSeats array
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = () => {
    const seats = [];
  
    for (let row = 1; row <= numRows; row++) {
      for (let col = 1; col <= numCols; col++) {
        const seatNumber = (row - 1) * numCols + col; // Calculate the seat number
  
        const isSeatSelected = selectedSeats.includes(seatNumber);
        const isSeatBooked = bookedSeats.includes(seatNumber);
  
        let seatClassName;
        if (isSeatSelected) {
          seatClassName = 'seat selected';
        } else if (isSeatBooked) {
          seatClassName = 'seat booked';
        } else {
          seatClassName = 'seat available';
        }
  
        seats.push(
          <div
            key={seatNumber}
            className={seatClassName}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      }
    }
  
    return seats;
  };
  

  return (
    <div className="seat-selector-container">
    <SeatKey /> {/* Include the SeatKey component */}
    <div className="seat-selector">{renderSeats()}</div>
      
    </div>
  );
};
export default Booking;