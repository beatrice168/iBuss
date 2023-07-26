import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div  className='navigation-bar'>
      <NavLink className='navLink' exact to='/'>
        Home 
      </NavLink>
      <NavLink className='navLink' to='/Booking'>
        Booking 
      </NavLink>
      <NavLink className='navLink' to='/Payment'>
        Payment 
      </NavLink>
      <NavLink className='navLink' to='/Contact'>
        Contact 
      </NavLink>
      
    </div>
  );
}

export default Navbar;
