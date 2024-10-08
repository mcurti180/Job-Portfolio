import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from './AuthComponent';

import LoginBackground from '../assets/loginbg.jpg';

import './login.css';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, login } = useAuth();

  const handleLogin = async () => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    
    if (data.message === 'Login successful') {
      login({ username }, data.access_token);
      window.location.href = '/quiz';
    } 
    else {
      setErrorMessage('Incorrect username or password');
    }

  };

  if (user) {
    window.location.href = '/quiz';
  }

  return (
    <body style={{
      backgroundImage: `url(${LoginBackground})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      margin: 0, // Reset default body margin
      padding: 0, // Reset default body padding
      height: '100vh'
    }}>
      <div className='login'>
        <h1>Login Page</h1>
        <div className="login_container">
          <label id="userlabel"> Username </label>
          <input 
            type="text" 
            placeholder="Enter Username" 
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            id="loginButton" 
            onClick={handleLogin}
            className='login-button'
          > 
            Login 
          </button>
              <NavLink to="/register">
            <button type="submit" id="registerButton" className='login-button' > 
              Register 
            </button>
            </NavLink>
        </div>
      </div>
    </body>
  );
};

export default LoginComponent;