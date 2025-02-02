require('dotenv').config(); // Uncomment if using environment variables
const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const CrimeReport = require('./models/CrimeReport'); // Mongoose model for crime reports
const corsOptions = require('./config/corsOptions'); // Custom CORS options (if you have them)
const app = express();

// Set up the port (default 3000 or environment variable)
const PORT = process.env.PORT || 3000;

// Set up multer for file uploads (using 'uploads/' folder)
const upload = multer({ 
  dest: 'uploads/', 
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, JPG, PDF files are allowed.'));
    }
    cb(null, true);
  }
});

// Enable CORS with custom options
app.use(cors(corsOptions));

// Middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));   // Root route (e.g., index.html, etc.)
app.use('/set-language', require('./routes/lang')); // Language setting route

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://pranavmudgil333:i1sdBdPHbzL32cE2@cluster0.saahg.mongodb.net/ComplaintsDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// POST route for the report form (integrated with your code)
app.post('/report-form', upload.single('evidencePath'), async (req, res) => {
  const { token, category, timeOfCrime, location, details, suspectInfo } = req.body;
  const evidencePath = req.file ? req.file.path : null; // Handle the uploaded file

  // Log or save the data in the database (e.g., MongoDB or JSON file)
  console.log({ token, category, timeOfCrime, location, details, suspectInfo, evidencePath });

  try {
    // Create the crime report object
    const report = { token, category, timeOfCrime, location, details, suspectInfo, evidence: evidencePath };

    // Save the report to MongoDB
    const newReport = new CrimeReport(report);  // Create a new CrimeReport instance
    await newReport.save();  // Save it to MongoDB

    // Send a success response
    res.json({
      message: 'Report submitted successfully',
      token,
    });
  } catch (err) {
    console.error('Error saving crime report:', err);
    res.status(500).json({ message: 'Error saving the report', error: err.message });
  }
});

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
  
// Handle 404 errors for any unmatched routes
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html')); // Send 404.html for HTML requests
  } else if (req.accepts('json')) {
    res.json({ error: '404 Page Not Found' });  // Send error JSON for API requests
  } else {
    res.type('txt').send('404 Page Not Found');  // Plain text for other types of requests
  }
});

  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
