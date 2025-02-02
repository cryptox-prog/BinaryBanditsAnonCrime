require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const CrimeReport = require('./models/CrimeReport');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer setup for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type.'));
    }
    cb(null, true);
  }
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/set-language', require('./routes/lang'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// POST route for crime report submission
app.post('/report-form', upload.single('evidencePath'), async (req, res) => {
  const { token, category, timeOfCrime, location, details, suspectInfo } = req.body;
  const evidencePath = req.file ? req.file.path : null;

  try {
    const report = new CrimeReport({ token, category, timeOfCrime, location, details, suspectInfo, evidence: evidencePath });
    await report.save();
    res.json({ message: 'Report submitted successfully', token });
  } catch (err) {
    console.error('Error saving crime report:', err);
    res.status(500).json({ message: 'Error saving the report', error: err.message });
  }
});

// GET route to fetch all reports
app.get('/fetch-reports', async (req, res) => {
  try {
    const reports = await CrimeReport.find({}, 'token category description location timeOfCrime suspectInfo evidence');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET route to fetch a report by token
app.get('/fetch-report/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const report = await CrimeReport.findOne({ token });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 404 error handling
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Page Not Found' });
  } else {
    res.type('txt').send('404 Page Not Found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
