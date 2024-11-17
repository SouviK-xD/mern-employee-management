const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

// Routes
// router.post('/register', register); // Register a new user
router.post('/login', login); // Login a user

module.exports = router;
