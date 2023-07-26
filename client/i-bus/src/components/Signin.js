import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
    console.log('Logged in successfully!'); // Replace with your actual login logic
  };

  const navigate = useNavigate();

  const handleSignUp = () => {
    // Navigate to the SignupPage
    navigate('/signup');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={handleSignUp}>Sign up</button></p>
    </div>
  );
}

export default LoginPage;
