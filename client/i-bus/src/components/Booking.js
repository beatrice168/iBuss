import React, { useState } from 'react';
// import './SeatSelector.css'; // Import your custom CSS file for styling
import SeatKey from './SeatKey';

const numRows = 5; // Number of rows of seats
const numCols = 6; // Number of columns of seats

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([5, 12, 15]); // Initialize with the initial booked seats

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    // Check if the seat is already selected
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handlePayment = () => {
    // Update the bookedSeats array with the selected seats
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeats([]); // Clear the selected seats after payment
  };

  const renderSeats = () => {
    const seats = [];

    for (let row = 1; row <= numRows; row++) {
      for (let col = 1; col <= numCols; col++) {
        const seatNumber = (row - 1) * numCols + col;

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
      <SeatKey />
      <div className="seat-selector">{renderSeats()}</div>
      <button onClick={handlePayment} disabled={!selectedSeats.length}>
        Make Payment
      </button>
    </div>
  );
};

export default Booking;
