import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div  className='navigation-bar'>
      <NavLink className='navLink' to='/components/Home'>
        Home 
      </NavLink>
      <NavLink className='navLink' to='/components/Booking'>
        Booking 
      </NavLink>
      <NavLink className='navLink' to='/components/Payment'>
        Payment 
      </NavLink>
      <NavLink className='navLink' to='/components/Contact'>
        Contact 
      </NavLink>
      
    </div>
  );
}

export default Navbar;
