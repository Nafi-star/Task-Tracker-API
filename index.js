// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON requests

// Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes); // Mount task routes

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Task Tracker API is running on Railway');
});

// Start server — bind to Railway's dynamic port and host
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
