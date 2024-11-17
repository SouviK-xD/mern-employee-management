const path = require('path');
const { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../services/employeeService');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage }).single('image');

// Controllers
const createEmployee = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { name, email, mobile, designation, gender, course } = req.body;

        if (!name || !email || !mobile || !designation || !gender || !course || !req.file) {
            return res.status(400).send('All fields are required.');
        }

        try {
            const employeeData = {
                Id: Date.now().toString(),
                Name: name,
                Email: email,
                Mobile: mobile,
                Designation: designation,
                Gender: gender,
                Course: course,
                Image: req.file.path,
            };

            const newEmployee = await addEmployee(employeeData);
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).send('Server error');
        }
    });
};

const fetchEmployees = async (req, res) => {
    try {
        const employees = await getEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const fetchEmployeeById = async (req, res) => {
    try {
        const employee = await getEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const modifyEmployee = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const updatedData = {
                ...req.body,
                Image: req.file ? req.file.path : req.body.Image, // Update image if new file is uploaded
            };

            const updatedEmployee = await updateEmployee(req.params.id, updatedData);
            if (!updatedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(updatedEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });
};

const removeEmployee = async (req, res) => {
    try {
        const deletedEmployee = await deleteEmployee(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).send('Employee deleted');
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createEmployee,
    fetchEmployees,
    fetchEmployeeById,
    modifyEmployee,
    removeEmployee,
};
