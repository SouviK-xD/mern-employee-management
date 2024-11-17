const Employee = require('../models/Employee');

const getEmployees = async () => {
    return await Employee.find();
};

const getEmployeeById = async (id) => {
    return await Employee.findOne({ Id: id });
};

const addEmployee = async (employeeData) => {
    const newEmployee = new Employee(employeeData);
    return await newEmployee.save();
};

const updateEmployee = async (id, updatedData) => {
    return await Employee.findOneAndUpdate({ Id: id }, updatedData, { new: true });
};

const deleteEmployee = async (id) => {
    return await Employee.findOneAndDelete({ Id: id });
};

module.exports = {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
};
