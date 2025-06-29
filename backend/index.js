const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Example Express server
const express = require('express');
const app = express();
const authRoutes = require('./auth');
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Add this to parse JSON bodies
app.use('/api', authRoutes); // Mount the signup route

app.get('/', (req, res) => {
  res.send('Backend is running and connected to MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
