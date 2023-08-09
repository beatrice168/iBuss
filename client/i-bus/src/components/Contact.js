import React, { useState } from 'react';
import {AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment } from 'react-icons/ai';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'; // Import the provided icons
import './Contact.css'; // Import your custom CSS file for styling
import Footer from './Footer'


const Contact = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const subjectData = {
      recipient,
      subject,
      message,
    };
    try {
      const response = await fetch('http://127.0.0.1:5555/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectData),
      });

      if (response.ok) {
        alert('message sent successfully!');
        setRecipient('');
        setSubject('');
        setMessage('');
      } else {
        const error = await response.json();
        alert('Failed to send message: ' + error.error);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
       
    // Here you can handle form submission, e.g., send data to a backend or API
    console.log('recipient:', recipient);
    console.log('Subject:', subject);
    console.log('Message:', message);
    // Reset form fields after submission
    // setrecipient('');
    // setsubject('');
    // setMessage('');
  };

 
  return (
    <>
    <div className="contact-container" style={{marginBottom:"40px",marginTop:"50px"}}>
      <h2>Get in Touch</h2>
      <div className="contact-info">
        <div className="contact-item">
          <AiOutlineMail className="contact-icon" />
          <p>Ibus@gmail.com</p>
        </div>
        <div className="contact-item">
          <AiOutlinePhone className="contact-icon" />
          <p>(254) 10345-785</p>
        </div>
        <div className="contact-item">
          <AiOutlineEnvironment className="contact-icon" />
          <p>Ngong Lane, Ngong, Nairobi</p>
        </div>
      </div>
      
      <h3>Send Us a Message</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Your email"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          type="subject"
          placeholder="Your subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {/* Social Icons */}
      <div classrecipient="social-icons-container">
        <a href="https://www.instagram.com/your-instagram-page" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="instagram" />
        </a>
        <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
        <a href="https://twitter.com/your-twitter-page" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="twitter" />
        </a>
        <a href="https://wa.me/https://CWU5cMZozsbCUhoFX0eNHR" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="whatsapp-icon" />
        </a>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default Contact