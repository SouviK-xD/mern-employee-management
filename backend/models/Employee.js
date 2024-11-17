const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
    Id: { type: String, required: true, unique: true }, 
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Mobile: { type: String, required: true },
    Designation: { type: String, required: true },
    Gender: { type: String, required: true },
    Course: { type: String, required: true },
    Image: { type: String },
    CreatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');
