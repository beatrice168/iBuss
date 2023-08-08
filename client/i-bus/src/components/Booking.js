import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeatKey from './SeatKey';

const numRows = 5;
const numCols = 6;
const seatPrice = 1000;

const totalSeats = numRows * numCols;

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatForPayment, setSelectedSeatForPayment] = useState(null);

  // Calculate the payment amount based on the number of selected seats and the seat price
  const paymentAmount = selectedSeats.length * seatPrice;

  const bookedSeats = [5, 12, 15]; // Example: array of booked seat numbers

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
      // Check if there are any selected seats remaining
      if (selectedSeats.length === 1) {
        setSelectedSeatForPayment(null); // Reset selected seat for payment
      }
    } else {
      // If the seat is unselected, add it to the selectedSeats array
      setSelectedSeats([...selectedSeats, seatNumber]);
      setSelectedSeatForPayment(seatNumber); // Set the selected seat for payment
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

  const handlePayment = () => {
    // Check if there are any selected seats before processing payment
    if (selectedSeats.length > 0) {
      // Implement your payment processing logic here.
      // For example, you could show a payment form or redirect to a payment gateway.
      console.log(`Processing payment for ${selectedSeats.length} seats with amount $${paymentAmount}...`);
    }
  };

  return (
    <div className="seat-selector-container">
      <SeatKey />
      <div className="seat-selector">{renderSeats()}</div>
      {selectedSeatForPayment && (
        <Link to="/payment" className="pay-button">
        <button className="pay-button" onClick={handlePayment}>
          Pay for {selectedSeats.length} Seats ksh{paymentAmount}
        </button>
        </Link>
      )}
    </div>
  );
};

export default Booking;