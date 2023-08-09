import React, { useState } from "react";

function AddBookingForm({ onAddBooking }) {
  const [booking, setBooking] = useState({
    customerId: "",
    busId: "",
    date: "",
    // Add other booking properties as needed
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBooking({
      ...booking,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddBooking(booking);
    // Reset the form fields if needed
    setBooking({
      customerId: "",
      busId: "",
      date: "",
      // Add other booking properties as needed
    });
  };

  return (
    <div>
      <h2>Add Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="bok">
          <label htmlFor="customerId">Customer ID:</label>
          <br></br>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={booking.customerId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="busId">Bus ID:</label>
          <br></br>
          <input
            type="text"
            id="busId"
            name="busId"
            value={booking.busId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <br></br>
          <input
            type="date"
            id="date"
            name="date"
            value={booking.date}
            onChange={handleChange}
          />
        </div>
        {/* Add other booking form input fields as needed */}
        <button type="submit">Add Booking</button>
      </form>
    </div>
  );
}

export default AddBookingForm;
