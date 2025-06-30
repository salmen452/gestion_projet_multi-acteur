const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Meeting = require('./models/Meeting');

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

// Get all users (for participants list)
router.get('/Users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Get all meetings (for meetings list)
router.get('/Meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find({});
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Create a new meeting
router.post('/Meetings', async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json(meeting);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Delete a meeting by ID
router.delete('/Meetings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Meeting.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Meeting not found.' });
    }
    res.json({ message: 'Meeting deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Update a meeting by ID
router.put('/Meetings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Meeting.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Meeting not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

module.exports = router;
