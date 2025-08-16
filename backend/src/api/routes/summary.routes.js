const express = require('express');
const { generateSummary } = require('../controllers/summary.controller');
const router = express.Router();

router.post('/generate', generateSummary);

module.exports = router;