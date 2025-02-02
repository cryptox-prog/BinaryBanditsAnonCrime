const mongoose = require('mongoose');

// Define the schema for crime reports
const crimeReportSchema = new mongoose.Schema({
  token: { type: String, required: true },
  category: { type: String, required: true },
  timeOfCrime: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String, required: true },
  suspectInfo: { type: String, required: false },
  evidence: { type: String, required: false },  // Store file path or URL to the evidence
});

// Create a model based on the schema
const CrimeReport = mongoose.model('CrimeReport', crimeReportSchema);

module.exports = CrimeReport;
