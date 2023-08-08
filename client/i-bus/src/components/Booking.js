import React, { useState, useEffect } from 'react';
import SeatKey from './SeatKey';
import { Link } from 'react-router-dom';

const numRows = 5;
const numCols = 6;

const Booking = ({cost}) => {
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [selectedSeatForPayment, setSelectedSeatForPayment] = useState(null);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [bookedSeats, setBookedSeats] = useState(new Set([5, 12, 15]));
  const [paymentAmount, setPaymentAmount] = useState(0); // State for current payment amount

  useEffect(() => {
    fetch('http://127.0.0.1:5555/buses')
      .then((r) => r.json())
      .then((busesArray) => {
        console.log(busesArray);

        setSelectedBus(busesArray[0]); // Set the default selected bus to the first one
      });
  }, []);

  useEffect(() => {
    if (selectedBus) {
      const newPaymentAmount = selectedSeats.size * selectedBus.cost;
      setPaymentAmount(newPaymentAmount); // Update the payment amount
      setBuses((prevBuses) =>
        prevBuses.map((bus) => ({
          ...bus,
          cost: bus.id === selectedBus.id ? newPaymentAmount : bus.cost,
        }))
      );
    }
  }, [selectedSeats, selectedBus]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.has(seatNumber)) {
      return;
    }

    const updatedSelectedSeats = new Set(selectedSeats);
    if (selectedSeats.has(seatNumber)) {
      updatedSelectedSeats.delete(seatNumber);
      // Remove the following line to prevent the button from disappearing when a seat is unselected.
      // setSelectedSeatForPayment(null);
    } else {
      updatedSelectedSeats.add(seatNumber);
      setSelectedSeatForPayment(seatNumber); // Update the selected seat only when a new seat is selected
    }

    setSelectedSeats(updatedSelectedSeats);

    // Calculate the new payment amount and update the state
    const newPaymentAmount = updatedSelectedSeats.size * selectedBus.cost;
    setPaymentAmount(newPaymentAmount);
  };

  const renderSeats = () => {
    const seats = [];

    for (let row = 1; row <= numRows; row++) {
      for (let col = 1; col <= numCols; col++) {
        const seatNumber = (row - 1) * numCols + col; // Calculate the seat number

        const isSeatSelected = selectedSeats.has(seatNumber);
        const isSeatBooked = bookedSeats.has(seatNumber);

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
  // console.log(cost)

  return (
    <>
    <div>
    {/* {costsArray.map((cost, index) => (
      <p key={index}>Cost: {cost}</p>
    ))} */}
  </div>
    <div className="seat-selector-container">
      <SeatKey />
      <div className="seat-selector">{renderSeats()}</div>
      {selectedSeatForPayment && (
        <div className="payment-details">
          <Link to={`/booking/${selectedBus.id}/Payment/${paymentAmount}`}>
            <button className="pay-button">
              Pay for {selectedSeats.size} Seats ksh{paymentAmount}
            </button>
          </Link>
        </div>
      )}
    </div>
    </>
  );
};

export default Booking;