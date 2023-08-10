import React from 'react';
import './AboutUs.css'; 
import Footer from './Footer';

function AboutUs() {
    return (
        <>
            <div>
            <div className='about-top-div'>
                <div className='about-top-div-text'>
                    <h4 className='top-div-text'>
                        <p style={{ fontSize: '25px', color: 'black', fontWeight: "lighter" }}>About us</p>
                        We are a bus booking platform dedicated to
                        simplifying your travel experience,<br />
                        And taking the hassle out of <br />
                        travel planning.
                    </h4>
                </div> 
                <img className='woman-about-image' src='images/girl-in-bus.png' alt='woman image'/>
            </div>
            <div className='about-div-2'>
                <div className='about-div-2-text'>
                    <h1>YOUR ULTIMATE BUS BOOKING PLATFORM</h1>
                </div>
                <img className='bus-and-city' src='images/bus-and-city.png' alt='woman image'/>
            </div>
            <div className='about-div-3'>
                <div className='about-div-3-point-1'>
                    <h1 className='about-div-3-heading' style={{textAlign:'left'}}>Passion for travel</h1>
                    <div style={{display:'flex'}}>
                    <p style={{fontSize: '23px', color: "#646464"}}>
                    Ibus was born out of a passion for travel and a commitment to transforming the way people experience bus journeys. We are a team of dedicated individuals who share a common 
                    <br />
                    love for exploration and innovation. 
                    <br />
                    <br />
                    We set out to create a platform that redefines convenience, reliability, and <br />customer satisfaction in the world of bus travel.
                    </p>
                    <img className='blue-bus-icon' src='images/about-bus-icon1.png' alt='blue-bus-icon'/>
                    </div>
                    <p></p>
                    
                </div>
                

            </div>

            <div className='about-div-3'>
                <div className='about-div-3-point-2' style={{display:'flex'}}>
                <img className='phone-ticket' src='images/phone-ticket.png' alt='blue-bus-icon'/>
                    
                    <div style={{display:'block'}}>
                    <h1 className='about-div-3-heading' style={{textAlign:'left'}}>What we do</h1>
                    <p style={{fontSize: '23px', color: "#646464"}}>
                    We aim to connect you with your destination, one bus ticket at a time. We understand that planning a journey can be overwhelming, which is why Ibus offers a user-friendly interface 
                    <br />
                    that puts you in control. 
                    <br />
                    <br />
                    Our extensive network of bus operators, routes, and schedules ensures that you <br />can find the perfect option to suit your needs, whether it's a short commute or a cross-country expedition.
                   </p>
                    </div>
                    <p></p>
                    
                </div>
                

            </div>

            </div>
        
            
        
        </>
        
    )
}

export default AboutUs;
