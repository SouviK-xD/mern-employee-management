const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); 

const mongoURI = process.env.MONGO_URI; 
const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Function to check MongoDB connection and ping the server
async function connectToDatabase() {
  try {
    await client.connect();
    // Send a ping to confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if connection fails
  }
}

connectToDatabase();

// Mongoose connection setup
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected through Mongoose'))
  .catch(err => console.error('Mongoose connection error:', err));

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
