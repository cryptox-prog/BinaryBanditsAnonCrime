require('dotenv').config(); // Load the .env file
const express = require('express');
const path = require('path');

// Get CORS options
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// Initialize Express an set the port
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors(corsOptions));

// Parse requests of content-type - application/x-www-form-urlencoded and application/json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Serve the static files from the public directory
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));

// Handle 404 error
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', "404.html")); // Send the 404.html file to the client
    } else if (req.accepts('json')) {
        res.sendFile({error: "404 Page Not Found"});
    } else {
        res.type('txt').send('404 Page Not Found');
    }
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});