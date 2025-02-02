const express = require('express');
const router = express.Router();

const languageController = require('../controllers/languageController');
router.post('/', languageController.handleSetLanguage);

module.exports = router;
