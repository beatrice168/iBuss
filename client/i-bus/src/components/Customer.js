import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'; 
import './Customer.css'; 

const Customer = () => {
  // State variables for login and sign up forms
 
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
  if (loginPassword.length < 7) {
    alert("Password should be at least 7 characters long.");
    return;
  } else if (!loginEmail.includes('@')) {
    alert("Invalid email address.");
    return;
  } 
  // else {
  //   navigate('/Book');
  // };
  fetch('http://127.0.0.1:5555/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
        // company: company, // Include the company data in the signup request
      }),
    })
      .then((response) => {
        if (response.ok) {
          // alert("Signin successful!");
          navigate('/Book');
        } else {
          alert("invalid details.");
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        alert("Error signing up. Please try again later.");
      });

    console.log('Login Email:', loginEmail);
    console.log('Login Password:', loginPassword);
  };

  // Handle sign up form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    } else if (signupPassword.length < 7) {
      alert("Password should be at least 7 characters long.");
      return;
    } else if (!signupEmail.includes('@')) {
      alert("Invalid email address.");
      return;
    } 
    // else {
    //   navigate('/Book');
    // };
    fetch('http://127.0.0.1:5555/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: signupEmail,
        password: signupPassword,
        // company: company, // Include the company data in the signup request
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful! A welcome email has been sent to your email address.");
          navigate('/Book');
        } else {
          alert("Error signing up. Please try again later.");
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        alert("Error signing up. Please try again later.");
      });

    // console.log('Signup Email:', signupEmail);
    // console.log('Signup Password:', signupPassword);
    // console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div>
      <div className="kastoma">
      <h1>CUSTOMER LOGIN</h1></div>
      <div className="login-container">
        <div className="login-form">
          <h2>I already have an account</h2>
          <h3>Sign in with your email account and password </h3>
          <form className='customer-login-form' onSubmit={handleLoginSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit">SIGN IN</button>
          </form>
        </div>
        <div className="signup-form">
          <h2>I don't have an account</h2>
          <h3> Sign up with your email account and password</h3>
          <form className='customer-login-form' onSubmit={handleSignupSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default Customer;