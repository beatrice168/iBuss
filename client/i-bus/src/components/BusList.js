// BusList.js
import React from 'react';
import { Link } from 'react-router-dom';

const BusList = ({ buses }) => {
  return (
    <div className="bus-list-container">
      {buses.map((bus) => (
        <div key={bus.id} className="bus-item">
          <h3>Bus {bus.id}</h3>
          <div className="bus-details">
            {/* <p>
              Departure: <span>{bus.departure}</span>
            </p> */}
            <p style={{ width: '350px', textAlign: "center" }}>
              <div className='to-from-div'><span>{bus.From}</span> <img className='link-image' src='/images/link-icon-long.png' alt='link-image' /> <span>{bus.To}</span></div>
              <br />
              Departure: <span>{bus.departure}</span>
            </p>
            {/* <p>
              Cost: <span>{bus.cost}</span>
            </p> */}
          </div >
          <div style={{textAlign: 'centre'}}>
          Cost: <span >{bus.cost}</span>
          <br />
          <br />
          <Link className='Book'to={`/booking/${bus.id}`}> <button className='book-button'>BOOK</button></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusList;
