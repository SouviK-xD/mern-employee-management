import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../styles/logo.png';
import { login, storeAuthDetails } from '../services/authService';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const validateInputs = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const data = await login({ username, password });
      await storeAuthDetails(data.token, username);
      onLoginSuccess(); // Notify parent component
    } catch (err) {
      alert(err.message || 'Invalid login details');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
    <div className="screen">
      <div className="screen__content">
        <form className="login">
          <img src={logo} alt="App Logo" className="logo" />
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login__input"
              onKeyDown={handleKeyDown}
            />
            {errors.username && <small className="error-text">{errors.username}</small>}
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login__input"
              onKeyDown={handleKeyDown}
            />
            {errors.password && <small className="error-text">{errors.password}</small>}
          </div>
          <button type="button" className="button login__submit" onClick={handleLogin}>
            <span className="button__text">LOG IN</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
        </form>
      </div>
      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4"></span>
        <span className="screen__background__shape screen__background__shape3"></span>
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1"></span>
      </div>
    </div>
  </div>
  );
};

export default Login;
