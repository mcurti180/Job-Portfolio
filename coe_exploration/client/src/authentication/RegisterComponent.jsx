import React, { useState } from 'react';
import './login.css';

import RegBackground from '../assets/loginbg.jpg';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    // TODO: Change localhost to something else
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    if (hasUpperCase && hasLowerCase && hasNumber && hasSymbol && isLongEnough) {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.message === 'User registered successfully') {
        window.location.href = '/';
      }
      else {
        setErrorMessage(data.message);
      }
    } 
    else {
      setErrorMessage('Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.');
    }
  };

  return (
    <body style={{
      backgroundImage: `url(${RegBackground})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      margin: 0, // Reset default body margin
      padding: 0, // Reset default body padding
      height: '100vh'
    }}>
      <div className='register'>
        <h1>Registration Page</h1>
        <div className="register_container">
          <label id="userlabel"> Username </label>
          <input 
            type="text" 
            placeholder="Enter Username" 
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label id='emaillabel'> Email </label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label id='passlabel'> Password </label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button 
            type="submit" 
            id="registerButton" 
            className="login-button"
            onClick={handleRegister}
          > 
            Register 
          </button>
        </div>
      </div>
    </body>
  );
};

export default RegisterComponent;