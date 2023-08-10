import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Payment1.css';
import busPaymentPageImage from '../images/bus-payment-page-image.png';

const PaymentWithParams = () => {
  const { busId, paymentAmount } = useParams();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idOrPassportNumber, setIdOrPassportNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const amount = paymentAmount;
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith('254')) {
      value = '254' + value;
    }
    setPhoneNumber(value);
  };

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

      if (response.ok) {
        window.alert("payment succesful. Check email for ticket!")
        navigate('/')

      } else {
        window.alert("Payment not succesful!")
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

    setFullName('');
    setPhoneNumber('');
    setIdOrPassportNumber('');
    setNationality('');
  };

  return (
    <div className="payment-di">
    <img src={busPaymentPageImage} className="payment-page-imag" alt="Payment" />
     {/* <img src='./images/bus-payment-page-image.png'className="payment-page-imag" alt="Payment" /> */}
     {/* <img src="https://i.pinimg.com/236x/1e/c3/bc/1ec3bc2666d9534eae03bc085a572cab.jpg"className="payment-page-imag" alt="Payment" /> */}
     <div className="form-di">
       <form onSubmit={handleFormSubmit}>
         <div className="form-sectio">
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
         <div className="form-sectio">
           <label>
             Phone Number: <br />
             <input
               placeholder="Phone Number"
               type="tel"
               value={phoneNumber}
               onChange={handlePhoneNumberChange}
               required
             />
           </label>
         </div>
         <div className="form-sectio">
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
         <div className="form-sectio">
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
           Pay with <img className="mpesa-imag" src="https://i.pinimg.com/236x/99/7b/33/997b335c2a4050bff99d1fd741bac6c3.jpg" alt="bus-payment-image" />
         </div>
         <div className="st-push">
           An stk push will be sent to your <br /> mobile number. Before you proceed, <br /> please confirm you have enough money <br /> in your M-Pesa.
         </div>
         <button className="submi-pay-button" type="submit">SUBMIT AND PAY</button>
         </form>
         </div>
         </div>
  );
};

export default PaymentWithParams;
