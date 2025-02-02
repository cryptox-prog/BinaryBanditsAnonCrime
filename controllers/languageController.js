
const handleSetLanguage = (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { language } = req.body;

    if (!language) {
        return res.status(400).json({ message: 'Language is required' });
    }

    res.cookie('selectedLanguage', language, { maxAge: 900000 });
    res.status(200).json({ message: 'Language set successfully' });
};


module.exports = { handleSetLanguage };