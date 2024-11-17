import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; 
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loading components
const Navbar = React.lazy(() => import('./components/Navbar'));
const Login = React.lazy(() => import('./components/Login'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const EmployeeList = React.lazy(() => import('./components/EmployeeList'));
const CreateEmployee = React.lazy(() => import('./components/CreateEmployee'));
const EditEmployee = React.lazy(() => import('./components/EditEmployee'));

function App() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if token exists in localStorage
    if (token) {
      setIsLoggedIn(true); // User is logged in if token exists
    }
  }, []);

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'yourToken'); // Save token to localStorage
    navigate('/dashboard');  // Navigate to dashboard after login success
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Remove token from localStorage on logout
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="App">
      {/* Render Navbar only when logged in */}
      {isLoggedIn && (
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar onLogout={handleLogout} />
        </Suspense>
      )}

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          
          {/* Protect these routes with authentication check */}
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/employee-list" 
            element={isLoggedIn ? <EmployeeList /> : <Navigate to="/" />} 
          />
          <Route 
            path="/create-employee" 
            element={isLoggedIn ? <CreateEmployee /> : <Navigate to="/" />} 
          />
          <Route 
            path="/edit-employee/:id" 
            element={isLoggedIn ? <EditEmployee /> : <Navigate to="/" />} 
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
