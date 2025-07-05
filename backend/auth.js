// Create a new user (admin only)
router.post('/Users', async (req, res) => {
  try {
    const { email, name, phone, organisation, password, role } = req.body;
    if (!email || !name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    const hashedPassword = await require('bcryptjs').hash(password, 10);
    const user = new User({ email, name, phone, organisation, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully.', user });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Delete a user by ID (admin only)
router.delete('/Users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});
// ...existing code...

const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer();
const jwt = require('jsonwebtoken');
const { authenticate, authorizeRole } = require('./middleware/auth');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const router = express.Router();
const Document = require('./models/Document');
const User = require('./models/User');
const Meeting = require('./models/Meeting');
const Action = require('./models/Action');
// --- DOCUMENTS CRUD ---
// Get all documents
router.get('/documents', async (req, res) => {
  try {
    const documents = await Document.find({});
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Create a new document with file upload (coordinator only)
router.post('/documents', authenticate, authorizeRole('coordinator'), upload.single('file'), async (req, res) => {
  try {
    const { name, type, date } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'File is required.' });
    }
    const document = new Document({
      name,
      type,
      date,
      file: file.buffer,
      fileType: file.mimetype,
      fileName: file.originalname
    });
    await document.save();
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Update a document by ID (PATCH) (coordinator only)
router.patch('/documents/:id', authenticate, authorizeRole('coordinator'), async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Document.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Document not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Delete a document by ID (coordinator only)
router.delete('/documents/:id', authenticate, authorizeRole('coordinator'), async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Document.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Document not found.' });
    }
    res.json({ message: 'Document deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});
// Download a document file by ID
router.get('/documents/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found.' });
    res.set({
      'Content-Type': doc.fileType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${doc.fileName || doc.name || 'document'}"`
    });
    res.send(doc.file);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});
// ...existing code...
// --- ACTIONS CRUD ---
// Get all actions
router.get('/actions', async (req, res) => {
  try {
    const actions = await Action.find({});
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Create a new action (coordinator only)
router.post('/actions', authenticate, authorizeRole('coordinator'), async (req, res) => {
  try {
    const action = new Action(req.body);
    await action.save();
    res.status(201).json(action);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Update an action by ID (PATCH) (coordinator only)
router.patch('/actions/:id', authenticate, authorizeRole('coordinator'), async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Action.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Action not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Delete an action by ID (coordinator only)
router.delete('/actions/:id', authenticate, authorizeRole('coordinator'), async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Action.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Action not found.' });
    }
    res.json({ message: 'Action deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});


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

// Login route with JWT
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
    const { password: _, ...userData } = user.toObject();
    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ message: 'Login successful', user: userData, token });
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

// Delete a meeting by ID (coordinator only)
router.delete('/Meetings/:id', authenticate, authorizeRole('coordinator'), async (req, res) => {
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

// Use multer().any() for meetings file upload
const meetingsUpload = multer().any();

// Helper to parse documents from req.files and req.body
function parseMeetingDocuments(req) {
  // For single document
  let name = req.body['document[name]'] || '';
  let type = req.body['document[type]'] || '';
  let fileObj = (req.files || []).find(f => f.fieldname === 'document[file]');
  return {
    name,
    type,
    file: fileObj ? fileObj.buffer : undefined,
    fileType: fileObj ? fileObj.mimetype : undefined,
    fileName: fileObj ? fileObj.originalname : undefined,
  };
}

// Create a new meeting (with file upload) (coordinator only)
router.post('/Meetings', authenticate, authorizeRole('coordinator'), meetingsUpload, async (req, res) => {
  try {
    console.log('FILES:', req.files);
    console.log('BODY:', req.body);
    let document = parseMeetingDocuments(req);
    // Only include document if at least one property is present
    const meetingData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      duration: req.body.duration,
      type: req.body.type,
      location: req.body.location,
      time: req.body.time,
      agenda: Array.isArray(req.body.agenda) ? req.body.agenda : (req.body.agenda ? [req.body.agenda] : []),
      participants: Array.isArray(req.body.participants) ? req.body.participants : (req.body.participants ? [req.body.participants] : [])
    };
    // Only add document if it has at least one property (name, type, or file)
    if (document && (document.name || document.type || document.file)) {
      meetingData.document = document;
    }
    const meeting = new Meeting(meetingData);
    await meeting.save();
    res.status(201).json(meeting);
  } catch (err) {
    console.error('MEETING CREATE ERROR:', err);
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Update a meeting by ID (with file upload) (coordinator only)
router.put('/Meetings/:id', authenticate, authorizeRole('coordinator'), meetingsUpload, async (req, res) => {
  try {
    let document = parseMeetingDocuments(req);
    const update = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      duration: req.body.duration,
      type: req.body.type,
      location: req.body.location,
      time: req.body.time,
      agenda: Array.isArray(req.body.agenda) ? req.body.agenda : (req.body.agenda ? [req.body.agenda] : []),
      participants: Array.isArray(req.body.participants) ? req.body.participants : (req.body.participants ? [req.body.participants] : [])
    };
    // Only add document if it has at least one property (name, type, or file)
    if (document && (document.name || document.type || document.file)) {
      update.document = document;
    } else {
      update.document = undefined;
    }
    const updated = await Meeting.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Meeting not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// Download a meeting's document by meeting ID
router.get('/Meetings/:id/document', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found.' });
    }
    const doc = meeting.document;
    if (!doc || !doc.file) {
      return res.status(404).json({ message: 'No document found for this meeting.' });
    }
    res.set({
      'Content-Type': doc.fileType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${doc.fileName || doc.name || 'document'}"`
    });
    res.send(doc.file);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});
// Update user by ID
router.patch('/Users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = {};
    if (req.body.name) update.name = req.body.name;
    if (req.body.phone) update.phone = req.body.phone;
    if (req.body.organisation) update.organisation = req.body.organisation;
    // Add more fields as needed
    const updated = await User.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

module.exports = router;