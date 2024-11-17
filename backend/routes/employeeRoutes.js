const express = require('express');
const router = express.Router();
const {
    createEmployee,
    fetchEmployees,
    fetchEmployeeById,
    modifyEmployee,
    removeEmployee,
} = require('../controllers/employeeController');

// Routes
router.post('/add-employee', createEmployee); // Add a new employee
router.get('/', fetchEmployees); // Get all employees
router.get('/:id', fetchEmployeeById); // Get an employee by ID
router.put('/:id', modifyEmployee); // Update an employee by ID
router.delete('/:id', removeEmployee); // Delete an employee by ID

module.exports = router;
