const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ingestController');
router.post('/upload', ...ctrl.uploadRoute);
module.exports = router;
