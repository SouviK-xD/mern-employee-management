import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EmployeeList.css';
import { fetchEmployees, deleteEmployee } from '../services/employeeService';

const IMG_API = process.env.REACT_APP_IMG_API_URL

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(5); // Items per page
    const [sortOrder, setSortOrder] = useState('asc'); // Sorting order

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await fetchEmployees();
                setEmployees(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        loadEmployees();
    }, []);

    // Total count of employees
    const totalEmployees = employees.length;

    // Filter employees based on the search term
    const filteredEmployees = employees.filter((employee) =>
        employee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginate the filtered employees
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Change page handler
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Handle sorting
    const handleSort = (column) => {
        const sortedEmployees = [...filteredEmployees].sort((a, b) => {
            if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setEmployees(sortedEmployees);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    };

    // Delete employee function
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter((employee) => employee.Id !== id));
                alert('Employee deleted successfully');
            } catch (error) {
                console.error(error.message);
                alert('Error deleting employee');
            }
        }
    };

    return (
        <div className="employee-list-container">
            <div className="header">
                <h2>Employee List</h2>

                <div className="filters">
                    <span className="total-count">Total Employees: {totalEmployees}</span>

                    <input
                        type="text"
                        placeholder="Search by Name or Email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <Link to="/create-employee" className="create-employee-link">
                    Create Employee
                </Link>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('Id')}>ID</th>
                        <th>Image</th>
                        <th onClick={() => handleSort('Name')}>Name</th>
                        <th onClick={() => handleSort('Email')}>Email</th>
                        <th onClick={() => handleSort('Mobile')}>Mobile</th>
                        <th onClick={() => handleSort('Designation')}>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th onClick={() => handleSort('Createdate')}>Create Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee) => (
                        <tr key={employee.Id}>
                            <td>{employee.Id}</td>
                            <td>
                                <img
                                    src={`${IMG_API}/${employee.Image.replace('\\', '/')}`}
                                    alt={employee.Name}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                />
                            </td>
                            <td>{employee.Name}</td>
                            <td>{employee.Email}</td>
                            <td>{employee.Mobile}</td>
                            <td>{employee.Designation}</td>
                            <td>{employee.Gender}</td>
                            <td>{employee.Course}</td>
                            <td>{employee.Createdate}</td>
                            <td>
                                <Link to={`/edit-employee/${employee.Id}`} className="action-button">
                                    Edit
                                </Link>
                                <button className="delete-button" onClick={() => handleDelete(employee.Id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;
