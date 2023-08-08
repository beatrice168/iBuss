// Assuming PaymentWithoutParams.js
// import React from 'react';
import './Payment.css'; // Import the CSS file
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';

const PaymentWithoutParams = () => {
    const {paymentAmount } = useParams();
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [idOrPassportNumber, setIdOrPassportNumber] = useState('');
    const [nationality, setNationality] = useState('');
    const amount = paymentAmount;
    console.log(amount);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('http://127.0.0.1:5555/pay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullName: fullName,
              phoneNumber: phoneNumber,
              idOrPassportNumber: idOrPassportNumber,
              nationality: nationality,
              amount: amount,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const responseData = await response.json();
          console.log('Response:', responseData);
        } catch (error) {
          console.error('Error:', error.message);
        }
    
        setFullName('');
        setPhoneNumber('');
        setIdOrPassportNumber('');
        setNationality('');
      };
  return (
    <div className="payment-div">
      <img src="images/bus-payment-page-image.png" className="payment-page-image" alt="Payment" />
      <div className="form-div">
        <form onSubmit={handleFormSubmit}>
          <div className="form-section">
            <label>
              Full name: <br />
              <input
                placeholder="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-section">
            <label>
              Phone Number: <br />
              <input
                placeholder="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-section">
            <label>
              ID or Passport: <br />
              <input
                placeholder="ID or Passport"
                type="text"
                value={idOrPassportNumber}
                onChange={(e) => setIdOrPassportNumber(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-section">
            <label>
              Nationality: <br />
              <input
                placeholder="Nationality"
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="pay-with-mpesa">
            Pay with <img className="mpesa-image" src="images/2560px-M-PESA_LOGO-01.svg.png" alt="bus-payment-image" />
          </div>
          <div className="stk-push">
            An stk push will be sent to your <br /> mobile number. Before you proceed, <br /> please confirm you have enough money <br /> in your M-Pesa.
          </div>
          <button className="submit-pay-button" type="submit">SUBMIT AND PAY</button>
          </form>
          </div>
          </div>
  );
};

export default PaymentWithoutParams;
///the main payment