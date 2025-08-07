// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');

// Import route handlers
const tasksRouter = require('./routes/tasks');
const authRoutes = require('./routes/authRoutes'); // ✅ Add this line

// Initialize Express app
const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Allow your frontend dev server
  credentials: true,               // ✅ Allow cookies/auth headers
}));

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/tasks', tasksRouter);     // ✅ Task routes
app.use('/api/auth', authRoutes);       // ✅ Auth routes (register/login)

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Task Tracker API is running on Railway');
});

// Start server — bind to Railway's dynamic port and host
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
