const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;
    console.log('Signup request body:', req.body); // Debug log
    if (!email || !name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({ email, name, phone, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Signup error:', err); // Debug log
    res.status(500).json({ message: err.message || 'Server error.', error: err });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    // Optionally, generate a token here (e.g., JWT)
    // For now, just return user info (excluding password)
    const { password: _, ...userData } = user.toObject();
    res.json({ message: 'Login successful', user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Test route to verify router
router.get('/test', (req, res) => {
  res.json({ message: 'Auth router is working!' });
});

module.exports = router;
