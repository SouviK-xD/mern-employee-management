import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create Employee
export const createEmployee = async (employeeData) => {
  try {
    const formData = new FormData();
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('mobile', employeeData.mobile);
    formData.append('designation', employeeData.designation);
    formData.append('gender', employeeData.gender);
    formData.append('course', employeeData.course); 
    formData.append('image', employeeData.image);

    const response = await axios.post(`${API_URL}/employees/add-employee`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data; 
  } catch (err) {
    throw new Error('Error creating employee');
  }
};


// edit employee
export const getEmployeeById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch employee data');
    }
  };
  
  export const updateEmployee = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update employee data');
    }
  };


  // Fetch all Employees
export const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      return response.data; 
    } catch (err) {
      throw new Error('Error fetching employees');
    }
  };
  
  // Delete Employee by ID
  export const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/employees/${id}`);
      return response.data; 
    } catch (err) {
      throw new Error('Error deleting employee');
    }
  };