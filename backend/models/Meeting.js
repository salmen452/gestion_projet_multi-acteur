const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  type: { type: String, required: true },
  agenda: [{ type: String }],
  documents: [{
    name: String,
    type: String,
    file: Buffer // Optional, for file uploads
  }],
  location: { type: String },
  time: { type: String },
  duration: { type: String },
  participants: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema, 'Meetings'); 