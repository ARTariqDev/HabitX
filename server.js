const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./db'); // Import MongoDB connection
const userRoutes = require('./routes/user'); // Import user routes
const habitRoutes = require('./routes/habit'); // Import habit routes

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/user', userRoutes); // User-related routes
app.use('/habit', habitRoutes); // Habit-related routes

// Start server
const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
