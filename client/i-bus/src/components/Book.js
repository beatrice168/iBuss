import React, { useState, useEffect } from 'react';
import BusList from './BusList';

const Book = () => {
  const [buses, setBuses] = useState([]);
  const [uniqueFromValues, setUniqueFromValues] = useState([]); // To store unique 'From' values
  const [uniqueToValues, setUniqueToValues] = useState([]); // To store unique 'To' values

  useEffect(() => {
    fetch('http://127.0.0.1:5555/buses')
      .then((r) => r.json())
      .then((busesArray) => {
        setBuses(busesArray);

        // Extract unique 'From' and 'To' values from the buses data
        const fromValues = (busesArray.map((bus) => bus.From)).sort();
        const toValues = (busesArray.map((buses) => buses.To)).sort()
        setUniqueFromValues(fromValues);
        setUniqueToValues(toValues);
      })
      .catch((error) => console.error('Error fetching buses:', error));
  }, []);

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

  return (
    <div className="bus-booking-page">
      <img className='book-page-image' src='images/book-image-clear.png' alt='book-bus-image'/> 
      <div className="search-form">
        <form onSubmit={handleSearch}>
          <select
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
          >
            <option value="">From</option>
            {uniqueFromValues.map((fromValue) => (
              <option key={fromValue} value={fromValue}>
                {fromValue}
              </option>
            ))}
          </select>
          <select
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
          >
            <option value="">To</option>
            {uniqueToValues.map((toValue) => (
              <option key={toValue} value={toValue}>
                {toValue}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="DATE"
          />
          <button className='Search' type="submit">SEARCH</button>
        </form>
      </div>
      <BusList buses={buses} handleBook={handleBook} />
    </div>
  );
};

export default Book;
