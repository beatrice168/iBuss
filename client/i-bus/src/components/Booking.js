import React, { useState, useEffect } from 'react';
import SeatKey from './SeatKey';
import { Link } from 'react-router-dom';
import Footer from './Footer'

const numRows = 5;
const numCols = 6;

const Booking = ({ cost }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([5, 12, 15]);
  const [selectedSeatForPayment, setSelectedSeatForPayment] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [selectedSeatsAfterPayment, setSelectedSeatsAfterPayment] = useState([]);

  useEffect(() => {
    const storedCost = JSON.parse(localStorage.getItem('cost'));
    setSelectedBus(storedCost);

    if (selectedSeats.length > 0 && selectedBus) {
      const newPaymentAmount = selectedSeats.length * storedCost;
      setPaymentAmount(newPaymentAmount);
    }
  }, [selectedSeats, selectedBus]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    const updatedSelectedSeats = [...selectedSeats];
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeatForPayment(null);
      updatedSelectedSeats.splice(updatedSelectedSeats.indexOf(seatNumber), 1);
    } else {
      updatedSelectedSeats.push(seatNumber);
      setSelectedSeatForPayment(seatNumber);
    }

    setSelectedSeats(updatedSelectedSeats);
    setPaymentAmount(updatedSelectedSeats.length * selectedBus.cost);
  };

  const handlePayment = () => {
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeatsAfterPayment(selectedSeats); // Store selected seats after payment
    setSelectedSeats([]);
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
    <>
    <div style={{marginBottom: "80px"}} className="seat-selector-container">
      <SeatKey />
      
      <div className="seat-selector">{renderSeats()}</div>
      <button className="confirm-button" onClick={handlePayment} disabled={selectedSeats.length === 0}>
        Confirm selection
      </button>
      <button className="selected-seats">
        {selectedSeatsAfterPayment.length > 0
          ? `Selected Seats: ${selectedSeatsAfterPayment.length}`
          : 'No Seats Selected'}
      </button>
      {selectedSeatForPayment && (
        <div className="payment-details">
          <Link to={`/booking/${selectedBus.id}/Payment/${paymentAmount}`}>
            <button className="pay-button">
              Pay ksh {paymentAmount}
            </button>
          </Link>
        </div>
      )}
      
    </div>
    <div>
      <Footer  />
    </div>
    </>
  );
};

export default Booking;