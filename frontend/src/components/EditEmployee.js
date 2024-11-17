import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getEmployeeById, updateEmployee } from '../services/employeeService';
import '../styles/EditEmployee.css';

const IMG_API = process.env.REACT_APP_IMG_API_URL

const EditEmployee = () => {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Mobile: '',
        Designation: '',
        Gender: '',
        Course: '',  
        Image: '' 
    });
    const [error, setError] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate(); 

    // Fetch employee data on component load
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployeeById(id);
                setFormData({
                    Name: data.Name,
                    Email: data.Email,
                    Mobile: data.Mobile,
                    Designation: data.Designation,
                    Gender: data.Gender,
                    Course: data.Course,
                    Image: data.Image
                });
                setPreviewImage(`${IMG_API}/${data.Image.replace("\\", "/")}`);
            } catch (err) {
                console.error('Error fetching employee data:', err);
                setError('Failed to fetch employee data');
            }
        };
        fetchEmployee();
    }, [id]);

    // Handle input change for text fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle file input change for the image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];

        if (file && !validTypes.includes(file.type)) {
            alert('Only JPG or PNG files are allowed.');
            return;
        }

        setFormData({
            ...formData,
            Image: file // Store the file for upload
        });
        setPreviewImage(URL.createObjectURL(file)); 
    };

   
    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({ ...formData, Course: value }); 
        } else {
            setFormData({ ...formData, Course: '' });  
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const form = new FormData();
        form.append('Name', formData.Name);
        form.append('Email', formData.Email);
        form.append('Mobile', formData.Mobile);
        form.append('Designation', formData.Designation);
        form.append('Gender', formData.Gender);
        form.append('Course', formData.Course);
    
        // Correct field name for multer
        if (formData.Image instanceof File) {
            form.append('image', formData.Image);
        } else {
            form.append('image', formData.Image); 
        }
    
        try {
            const data = await updateEmployee(id, form);
            console.log('Employee updated successfully:', data);
            navigate('/employee-list');
        } catch (err) {
            console.error('Error updating employee:', err.message);
            setError('Error updating employee data');
        }
    };

    if (!formData.Name) {
        return <div>Loading...</div>; // Show loading state while fetching employee data
    }

    return (
        <div className="edit-employee-container">
            <div className="edit-employee-header">
                <h2>Edit Employee Details</h2>
            </div>
            {error && <div className="error-message">{error}</div>}
            <form className="edit-employee-form" onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mobile</label>
                    <input
                        type="text"
                        name="Mobile"
                        value={formData.Mobile}
                        onChange={handleChange}
                        pattern="\d{10}" // Enforces numeric validation
                        title="Mobile number must be 10 digits"
                        required
                    />
                </div>
                <div>
                    <label>Designation</label>
                    <select
                        name="Designation"
                        value={formData.Designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender</label>
                    <div>
                        <input
                            type="radio"
                            name="Gender"
                            value="Male"
                            checked={formData.Gender === 'Male'}
                            onChange={handleChange}
                        /> Male
                        <input
                            type="radio"
                            name="Gender"
                            value="Female"
                            checked={formData.Gender === 'Female'}
                            onChange={handleChange}
                        /> Female
                    </div>
                </div>
                <div>
                    <label>Course</label>
                    <div>
                        <input
                            type="checkbox"
                            name="Course"
                            value="MCA"
                            checked={formData.Course === 'MCA'}
                            onChange={handleCourseChange}
                        /> MCA
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="Course"
                            value="BCA"
                            checked={formData.Course === 'BCA'}
                            onChange={handleCourseChange}
                        /> BCA
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="Course"
                            value="BSC"
                            checked={formData.Course === 'BSC'}
                            onChange={handleCourseChange}
                        /> BSC
                    </div>
                </div>
                <div>
                    <label>Image</label>
                    {previewImage && (
                        <div>
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        name='image'
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                    />
                </div>
                <button className="save-button" type="submit">
                    Save Changes
                </button>
                <button
                    className="back-button"
                    type="button"
                    onClick={() => navigate('/employee-list')} 
                >
                    Back
                </button>
            </form>
        </div>
    );
};

export default EditEmployee;
