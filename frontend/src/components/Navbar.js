import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../styles/logo.png';
import '../styles/Navbar.css'; 

const Navbar = React.memo(() => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-logo"><img src={logo} alt="App Logo" className="logo" /></Link>
        <ul className="navbar-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/employee-list">Employee List</Link></li>
        </ul>
      </div>

      {/* Username display and Logout button */}
      <div className="navbar-right">
        {username && <span className="username">Hello, {username}</span>}
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
});

export default Navbar;
