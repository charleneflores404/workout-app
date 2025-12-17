const express = require('express');

// controller functions
const { healthPing } = require('../controllers/healthController');

const router = express.Router();

// Ping backend, to pre-warm as Render has cold start
router.get('/', healthPing);

module.exports = router;
