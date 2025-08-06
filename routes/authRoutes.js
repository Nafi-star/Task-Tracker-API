const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// ✅ Debug route to confirm routing works
router.get('/test', (req, res) => {
  res.send('✅ Auth route is working');
});

module.exports = router;
