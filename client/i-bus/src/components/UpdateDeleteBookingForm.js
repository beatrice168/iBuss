import React, { useState } from "react";

function UpdateDeleteBookingForm({ bookings, onUpdateBooking, onDeleteBooking }) {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const handleUpdateBooking = (event) => {
    event.preventDefault();
    if (selectedBooking) {
      onUpdateBooking(selectedBooking.id, selectedBooking);
    }
  };

  const handleDeleteBooking = (event) => {
    event.preventDefault();
    if (selectedBooking) {
      onDeleteBooking(selectedBooking.id);
      setSelectedBooking(null);
    }
  };

  return (
    <div>
      <h2>Update/Delete Booking</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} onClick={() => handleSelectBooking(booking)}>
            {/* Display booking information here (e.g., customer name, bus details, etc.) */}
          </li>
        ))}
      </ul>
      {selectedBooking && (
        <form onSubmit={handleUpdateBooking}>
          {/* Add form input fields for updating booking here */}
          <button type="submit">Update Booking</button>
          <button onClick={handleDeleteBooking}>Delete Booking</button>
        </form>
      )}
    </div>
  );
}

export default UpdateDeleteBookingForm;
