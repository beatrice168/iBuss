import React, { useState } from 'react';

function Send() {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailData = {
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
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert('Email sent successfully!');
        setRecipient('');
        setSubject('');
        setMessage('');
      } else {
        const error = await response.json();
        alert('Failed to send email: ' + error.error);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient:</label>
<<<<<<< HEAD
          <input type="email" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
=======
          <input type="email" value={recipient} className='inpu' onChange={(e) => setRecipient(e.target.value)} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} className='inpu' onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} className='inpu' onChange={(e) => setMessage(e.target.value)} required />
>>>>>>> de610c9c9f4f086dd9c7746454be60f24c45e664
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default Send;
