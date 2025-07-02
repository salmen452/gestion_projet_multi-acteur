const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  file: { type: Buffer, required: true }, // Store file as binary
  fileType: { type: String }, // Store MIME type
  fileName: { type: String }, // Store original file name
  type: { type: String, required: true },
  date: { type: String, required: true },
}, { timestamps: true, collection: 'Documents' });
// Explicitly set the collection name to 'Documents' (capital D)

module.exports = mongoose.model('Document', documentSchema);
