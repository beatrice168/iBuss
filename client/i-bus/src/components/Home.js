import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from './axiosInstance';

function Home() {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // Fetch user data from the protected route
    axiosInstance
      .get('/Protected')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className='home'>
    {/* <h1>Your safari just began</h1> */}
    {/* Display user data */}
    {/* {userData ? (
        <div>
          <h2>Welcome, {userData.username}</h2>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Please sign in to access the protected route.</p>
      )} */}


    <img className='home-image' src='/images/Homeimage.jpg' alt='Homeimage' />
    
    
    
    </div>
  )
}
export default Home
