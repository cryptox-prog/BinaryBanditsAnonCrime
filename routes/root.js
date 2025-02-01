const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => { 
    res.redirect(301, '/language-selector.html'); // Redirect the client to the languageSelectorPage.html file, 302 (temprory redirect) by default
});

router.get('/language-selector(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', "languageSelectorPage.html")); // Send the languageSelectorPage.html file to the client
});

router.get('/mode-selector(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', "modeSelectorPage.html")); // Send the languageSelectorPage.html file to the client
});

module.exports = router;
