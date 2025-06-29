const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;
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
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
