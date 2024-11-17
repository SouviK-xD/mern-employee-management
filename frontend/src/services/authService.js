import axios from 'axios';


const AUTH_URL = process.env.REACT_APP_AUTH;


// Perform user login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, credentials);
    return response.data; 
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};

// Store authentication details
export const storeAuthDetails = async (token, username) => {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  } catch (err) {
    throw new Error('Error storing authentication details');
  }
};

// Clear authentication details
export const clearAuthDetails = async () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  } catch (err) {
    throw new Error('Error clearing authentication details');
  }
};

// Get the username of the logged-in user
export const getUsername = async () => {
  try {
    return localStorage.getItem('username');
  } catch (err) {
    throw new Error('Error retrieving username');
  }
};
