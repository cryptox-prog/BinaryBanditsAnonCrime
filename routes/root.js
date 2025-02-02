const express = require('express');
const router = express.Router();
const path = require('path');



router.get('^/$|/index(.html)?', (req, res) => { 
    res.redirect(301, '/home'); // Redirect the lient to the languageSelectorPage.html file, 301 (permanent redirect)
});

router.get('/language-selector(.html)?', (_, res) => { 
    //res.cookie('selectedLanguage', 'en', { maxAge: 900000, httpOnly: true }); // Set the cookie with a default value
    res.sendFile(path.join(__dirname, '..', 'views', "languageSelectorPage.html")); // Send the modeSelectorPage.html file to the client
});

router.get('/mode-selector(.html)?', (_, res) => { 
    //res.cookie('selectedLanguage', 'en', { maxAge: 900000, httpOnly: true }); // Set the cookie with a default value
    res.sendFile(path.join(__dirname, '..', 'views', "modeSelectorPage.html")); // Send the modeSelectorPage.html file to the client
});
router.get('/report-form(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views','complaint', "complaint.html")); // Send the languageSelectorPage.html file to the client
});

router.get('/case-tracker(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', "caseTracker", "casetracker.html")); // Send the languageSelectorPage.html file to the client
});

router.get('/home(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', "home", "home.html")); // Send the languageSelectorPage.html file to the client
});

module.exports = router;