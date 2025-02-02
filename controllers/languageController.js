//const express = require('express');
//const router = express.Router();

/*const jwt = require('jsonwebtoken');

const handleSetLanguage = (req, res) => {
    const { language } = req.body;
    res.cookie('selectedLanguage', language, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: 'Language set successfully' });
}
module.exports = {handleSetLanguage};
*/
const handleSetLanguage = (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { language } = req.body;

    if (!language) {
        return res.status(400).json({ message: 'Language is required' });
    }

    res.cookie('selectedLanguage', language, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: 'Language set successfully' });
};

module.exports = { handleSetLanguage };