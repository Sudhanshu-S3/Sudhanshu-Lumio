const express = require('express');
const router = express.Router();
const shareController = require('../controllers/share.controllers');

router.post('/', shareController.shareSummary);

module.exports = router;