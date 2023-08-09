import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'; 
import Footer from './Footer';

function Home() {


  return (
    <div className='home-page'> 
    <div className='home-background'>
  
    <div className='home-text'>
      <div className='title-div'>
      <h1 style={{ fontSize: '50px' }}>I-BUS BOOKING</h1>
      </div>
      <div className='why-us-div'>
      <h2 className='why-us-title'>WHY US</h2>
      <ul className='why-us-list'>
        <li>We cover multiple routes </li>
        <li>We are affordable </li>
        <li>We ensure your comfort</li>
        <li>Easy booking and payment</li>
      </ul>
      <h3 style={{ fontSize: '45px', marginTop: '50px' }}>YOUR SAFARI JUST <br></br>BEGUN</h3>
      <button className='home-book-button'><NavLink className='navLink-book' to='/Book'>
        CLICK HERE TO BOOK
      </NavLink></button>
      </div>
      </div>
    </div>
    
    <div className='middle-page'>
      <div className='how-it-works'>
        <h1 style={{ marginBottom: '30px' }}>How it works</h1>
        <p style={{ marginBottom: '40px', fontSize: '19px' }}>With I-Bus Booking, attaining a ticket to your desired destination <br /> is a seamless and effortless process.</p>
        <div className='how-it-works-pic'>
        <img src='images/young-black-woman-aun-tram-station-uses-smartphone_641386-1045.jpg' alt='book-bus-image'/>
        <div className='mid-image-text'>
        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Book a bus</h4>
        <p>Select your destination and date of <br /> travel then book a seat</p>
        </div>
        </div>
        <div className='how-it-works-pic'>
        <img src='images/online-payment.jpg' alt='book-bus-image'/>
        <div className='mid-image-text'>
        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Make Payment</h4>
        <p>After selecting your seat <br /> follow our hassle free payment process</p>
        </div>
        </div>
        <div className='how-it-works-pic'>
        <img src='images/enjoy-your-ride.jpg' alt='book-bus-image'/>
        <div className='mid-image-text'>
        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Enjoy your ride</h4>
        <p>Enjoy your journey with one of our <br /> large selection of buses </p>
        </div>
        </div>
      </div>
    </div>

    <div className='bus-banner-image'>
    <img className='home-bus-image-2' src='images/hom-image-bus-2.jpg' alt='book-bus-image'/>
    </div>

    <div className='icon-section'>
      <div className='how-it-works'>
        <h1 style={{ marginBottom: '30px' }}>Some of our amenities and benefits include</h1>
       
        <div className='how-it-works-pic'>
        <img style={{ width: '70%' }} src='images/wifi-preview.png' alt='book-bus-image'/>
        <div className='mid-image-text'>
        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Wi-Fi Connectivity:</h4>
        <p> Access to high-speed internet to stay connected  <br /> during the journey.</p>
        </div>
        </div>
        <div className='how-it-works-pic'>
        <img style={{ width: '70%' }}  src='images/socket.png' alt='book-bus-image'/>
        <div className='mid-image-text'>
        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Power Outlets</h4>
        <p>Our buses are fitted with <br /> outlets to charge your devices on the go</p>
        </div>
        </div>
        <div className='how-it-works-pic'>
        <img src='images/24-hours.png' alt='book-bus-image'/>
        <div className='mid-image-text'>
        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Book anytime</h4>
        <p>Book anytime from the convenience of <br /> your office, home, school, or market.</p>
        </div>
        </div>
      </div>
      
    </div>
    
    <Footer/>
    </div>
  )
}
export default Home