import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [showAdminSignIn, setShowAdminSignIn] = useState(true);
  const [showCustomerSignIn, setShowCustomerSignIn] = useState(true);

  const handleAdminSignInClick = () => {
    setShowAdminSignIn(false);
  };

  const handleCustomerSignInClick = () => {
    setShowCustomerSignIn(false);
  };

  return (
    <div className='navigation-bar'>
      <NavLink className='navLink' exact to='/'>
        Home 
      </NavLink>
      <NavLink className='navLink' to='/Book'>
        Book
      </NavLink>
      {/* <NavLink className='navLink' to='/Payment'>
        Payment 
      </NavLink> */}
      <NavLink className='navLink' to='/Contact'>
        Contact 
      </NavLink>
      <NavLink className='navLink' to='/AboutUs'>
        About
      </NavLink>
      {showAdminSignIn && (
        <div className='sign-in-container'>
          <div className='admin-sign-up-div'>
            <NavLink className='admin-sign-in' to='/signin' onClick={handleAdminSignInClick}>
              ADMIN SIGN IN 
            </NavLink>
          </div>
        </div>
      )}
      {showCustomerSignIn && (
        <div className='sign-in-container'>
          <div className='customer-sign-up-div'>
            <NavLink className='customer-sign-in' to='/Customer' onClick={handleCustomerSignInClick}>
              CUSTOMER SIGN IN 
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
