import React, { useState } from 'react';
import BusList from './BusList';

const Book = () => {
  // Assuming you have an array of bus objects with the necessary data
  const [buses, setBuses] = useState([
    {
      id: 1,
      departure: 'City A',
      arrival: 'City B',
      cost: 50,
    },
    {
      id: 2,
      departure: 'City C',
      arrival: 'City D',
      cost: 40,
    },
    // Add more bus objects as needed
  ]);

  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement the search logic here based on searchFrom, searchTo, and searchDate
    // You can update the 'buses' state based on the search criteria
    // For now, we'll just console.log the search data
    console.log('From:', searchFrom);
    console.log('To:', searchTo);
    console.log('Date:', searchDate);
  };

  // Define the handleBook function to handle booking a bus
  const handleBook = (busId) => {
    // Implement the booking logic here based on the busId
    // For example, you can update the 'buses' state to mark the bus as booked
    // You can also redirect the user to a booking page or show a modal for booking details
    console.log('Booking Bus:', busId);
  };

// const imae = {width:'95%'}

  return (
    <div className="bus-booking-page">
    <img className='book-page-image' src='images/book.jpeg' alt='book-bus-image'/> 
      <div className="search-form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            placeholder="From"
          />
          <input
            type="text"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            placeholder="To"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="DATE"
          />
          <button className='Search' type="submit">SEARCH</button>
        </form>
      </div>
      <BusList buses={buses} handleBook={handleBook} /> {/* Pass handleBook function as prop */}
      </div>
  );
};

export default Book;
