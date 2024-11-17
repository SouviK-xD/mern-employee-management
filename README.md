# Employee Management System 🧑‍💼

Welcome to the Employee Management System! This project is designed using MERN to help manage employee records efficiently. It consists of a backend built with Node.js and Express, and a frontend developed using React.

## Getting Started 🚀

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (for the database)

### Installation

1. **Clone the repository**:
   ```bash```
   git clone https://github.com/SouviK-xD/mern-employee-management.git

   cd mern-employee-management


   cd backend
npm install

cd ../frontend
npm install

Environment Variables 🌍
Create two .env files in the respective directories as shown below:

Backend (.env)
MONGO_URI = mongodb+srv://souvik1147:cosmic-byte32@cluster0.vda19fk.mongodb.net/employeeDB?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=secretkey

Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_IMG_API_URL=http://localhost:5000
REACT_APP_AUTH=http://localhost:5000/api/auth


Running the Project Locally 🏃‍♂️

Start the backend server:
Open a terminal in the backend directory and run:
npm start

The backend server should now be running on http://localhost:5000.

Start the frontend application:

Open another terminal in the frontend directory and run:
npm start

The frontend application should now be accessible at http://localhost:3000.
Access the Application:
Open your web browser and navigate to http://localhost:3000 to view the Employee Management System.

Login Credentials 🔑

To log in to the application, use the following credentials:
Username: souvik
Password: admin

Usage 📖
Once both servers are running, you can use the application to perform various operations such as adding new employees, viewing employee details, updating records, and deleting employees.
