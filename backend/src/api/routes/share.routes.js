const express = require('express');
const { shareSummary } = require('../controllers/share.controllers');
const router = express.Router();

router.post('/', shareSummary);

module.exports = router;