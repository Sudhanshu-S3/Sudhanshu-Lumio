const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summary.controller.js');

// Setup checks 

router.post('/generate', summaryController.generateSummary);

module.exports = router;