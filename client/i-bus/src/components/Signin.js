import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.length < 7) {
      alert("Password should be at least 7 characters long.");
      return;
    } else if (!email.includes('@')) {
      alert("Invalid email address.");
      return;
    } 
    // else {
    //   navigate('/admin');
    // }
    fetch('http://127.0.0.1:5555/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        // company: company, // Include the company data in the signup request
      }),
    })
      .then((response) => {
        if (response.ok) {
          // alert("Signin successful!");
          navigate('/admin');
        } else {
          alert("invalid details.");
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        alert("Error signing up. Please try again later.");
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    } else if (newPassword.length < 7) {
      alert("Password should be at least 7 characters long.");
      return;
    } else if (!newEmail.includes('@')) {
      alert("Invalid email address.");
      return;
    } 
    // else {
    //   navigate('/admin');
    // }
    fetch('http://127.0.0.1:5555/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newEmail,
        password: newPassword,
        company: company, // Include the company data in the signup request
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful! A welcome email has been sent to your email address.");
          navigate('/admin');
        } else {
          alert("Error signing up. Please try again later.");
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        alert("Error signing up. Please try again later.");
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      {/* Sign-In Form */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ marginTop:'95px', fontFamily: 'sans-serif', fontWeight: 'bold',color:"#0F52BA" }}>ADMIN LOGIN</h2>
        <h3 style={{ fontFamily: 'sans-serif' ,fontWeight: 'bold'}}>Sign in with your email and password</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder='Email'
            style={{ fontFamily: 'sans-serif', width: '300px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder='Company'
            style={{ fontFamily: 'sans-serif', width: '300px' }}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder='Password'
            value={password}
            style={{ fontFamily: 'sans-serif', width: '300px' }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" style={{ fontFamily: 'sans-serif', backgroundColor: '#0F52BA', color: 'white' ,width:"5vw"}}>Sign in</button>
        </form>
      </div>

      {/* Sign-Up Form */}
      <div style={{ textAlign: 'center' }}>
        <h2>Don't have an account?</h2>
        <h3>Sign Up</h3>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder='Email'
            style={{ fontFamily: 'sans-serif', width: '300px' }}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder='Company'
            value={newCompany}
            style={{ fontFamily: 'sans-serif', width: '300px' }}
            onChange={(e) => setNewCompany(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder='Password'
            value={newPassword}
            style={{ fontFamily: 'sans-serif', width: '300px' }}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            style={{ fontFamily: 'sans-serif', width: '300px' }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button type="submit" style={{ fontFamily: 'sans-serif', backgroundColor: '#0F52BA', color: 'white' ,width:"5vw"}}>Sign up</button>
        </form>
      </div>

      {/* Styling for single-line inputs */}
      <style>
        {`
          input {
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #ccc;
            padding: 0.5rem;
            margin: 0.5rem;
            outline: none;
            width: 200px;
            text-align:center
          }
        `}
      </style>
    </div>
  );
}

export default LoginPage;
