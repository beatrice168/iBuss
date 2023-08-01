import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'; 

function Home() {


  return (
    <div className='home-background'>
  
    <div className='home-text'>
      <div className='title-div'>
      <h1>I-BUS BOOKING</h1>
      </div>
      <div className='why-us-div'>
      <h2 className='why-us-title'>WHY US</h2>
      <ul className='why-us-list'>
        <li>We cover multiple routes </li>
        <li>We are affordable </li>
        <li>We ensure you comfort</li>
        <li>Easy booking and payment</li>
      </ul>
      <h3>YOUR SAFARI JUST <br></br>BEGUN</h3>
      </div>
      </div>
    </div>
  )
}
export default Home
