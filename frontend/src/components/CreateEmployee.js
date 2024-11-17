import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/employeeService'; 
import '../styles/CreateEmployee.css'

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',  
    image: null,
  });
  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (name === 'image') {
      setEmployee({ ...employee, image: files[0] });
    } else if (name === 'course' && checked) {
      setEmployee({ ...employee, course: value });
    } else if (name === 'course' && !checked) {
      setEmployee({ ...employee, course: '' });
    } else if (type === 'radio') {
      setEmployee({ ...employee, [name]: value });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!employee.name) errors.name = 'Name is required';
    if (!employee.email) errors.email = 'Email is required';
    else if (!emailRegex.test(employee.email)) errors.email = 'Invalid email format';
    
    if (!employee.mobile) errors.mobile = 'Mobile is required';
    else if (!mobileRegex.test(employee.mobile)) errors.mobile = 'Mobile number must be 10 digits';
    
    if (!employee.designation) errors.designation = 'Designation is required';
    if (!employee.gender) errors.gender = 'Gender is required';
    if (!employee.course) errors.course = 'Course is required';  
    if (!employee.image) errors.image = 'Image is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      await createEmployee(employee);  // Call the service to create the employee
      alert('Employee created successfully');
      navigate('/employee-list');
    } catch (err) {
      alert('Error creating employee');
    }
  };

  return (
    <div className="create-employee-container">
    <div className="screen">
      <div className="screen__content">
        <h2 className="form-title">Create Employee</h2>
        <form className="create-employee" onSubmit={handleSubmit}>
          <div className="form__field">
            <i className="form__icon fas fa-user"></i>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={employee.name}
              onChange={handleChange}
              className="form__input"
            />
            {errors.name && <small className="error-text">{errors.name}</small>}
          </div>
  
          <div className="form__field">
            <i className="form__icon fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={employee.email}
              onChange={handleChange}
              className="form__input"
            />
            {errors.email && <small className="error-text">{errors.email}</small>}
          </div>
  
          <div className="form__field">
            <i className="form__icon fas fa-phone"></i>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={employee.mobile}
              onChange={handleChange}
              className="form__input"
            />
            {errors.mobile && <small className="error-text">{errors.mobile}</small>}
          </div>
  
          <div className="form__field">
            <select
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              className="form__select"
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.designation && <small className="error-text">{errors.designation}</small>}
          </div>
  
          <div className="form__field">
            <label className="form__label">Gender</label>
            <div className="form__radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={employee.gender === 'Male'}
                  onChange={handleChange}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={employee.gender === 'Female'}
                  onChange={handleChange}
                /> Female
              </label>
            </div>
            {errors.gender && <small className="error-text">{errors.gender}</small>}
          </div>
  
          <div className="form__field">
            <label className="form__label">Courses</label>
            <div className="form__checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={employee.course === 'MCA'}
                  onChange={handleChange}
                /> MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={employee.course === 'BCA'}
                  onChange={handleChange}
                /> BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={employee.course === 'BSC'}
                  onChange={handleChange}
                /> BSC
              </label>
            </div>
            {errors.course && <small className="error-text">{errors.course}</small>}
          </div>
  
          <div className="form__field">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="form__input"
            />
            {errors.image && <small className="error-text">{errors.image}</small>}
          </div>
  
          <button type="submit" className="button form__submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default CreateEmployee;
