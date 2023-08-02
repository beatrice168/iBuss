// import React from "react"
import Send from './send';
import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter,FaWhatsapp } from 'react-icons/fa';

 function Contact(){

         return(
         <div>
           <div className="contact-container">
               <p className="contact-title">GET IN TOUCH</p>
               <div className="contact-item">
               <img className='email-adress' src='/images/Email.jpeg' alt='Emailadress' />
               <p className="P1">Email:ibus@gmail.com</p>
               </div>
               <div className="contact-item">
               <img className='phone' src='/images/Phone.jpeg' alt='Phone' />
               <p className ="P2">Tel.NO:0710345785</p>
               </div>
               <div className="contact-item">
               <img className='location' src='/images/Location.jpeg' alt='Location' />
               <p className="P3">Location:Ngong,Nairobi,Kenya</p>
               </div>
               <Send/>
               <div className="social-icons-container">
                  <a href="https://www.instagram.com/your-instagram-page " target="_blank" rel="noopener noreferrer">
                       <FaInstagram  className="instagram"/>
                  </a>
                  <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noreferrer">
                    <FaFacebook  className="social-icon" />
                  </a>
                  <a href="https://twitter.com/your-twitter-page" target="_blank" rel="noreferrer">
                  <FaTwitter  className="twitter"/>
                  </a>
                  <a href="https://wa.me/https://CWU5cMZozsbCUhoFX0eNHR" target="_blank" rel="noreferrer">
                  <FaWhatsapp className=" whatsapp-icon" />
                   </a>
                   </div>
                   </div>

            </div>
       )
 }
 export default Contact