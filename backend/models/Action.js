const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String }, // You can use Date if you want strict date handling
  priority: { type: String, enum: ['Haute', 'Moyenne', 'Basse'], default: 'Moyenne' },
  status: { type: String, enum: ['À faire', 'En cours', 'Terminées'], default: 'À faire' },
  participants: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Action', actionSchema);
