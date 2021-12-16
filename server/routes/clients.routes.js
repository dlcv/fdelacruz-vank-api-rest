const { Router } = require('express');
const { logger } = require('../config/logs');
// const { verifyToken, verifyAPIKey } = require('../middlewares/auth');

const { saveClient } = require('../controllers/clients.controller');

const router = Router();

// Client routes
router.post('/client/', saveClient);

module.exports = router;