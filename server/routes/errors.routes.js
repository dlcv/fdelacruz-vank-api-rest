const { Router } = require("express");
const { logger } = require("../config/logs");
// const { verifyToken, verifyAPIKey } = require("../middlewares/auth");

const router = Router();

// Error handling
router.use((req, res, next) => {
    let error = "Route not found";
    logger.error(`400 || ${ error } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
    res.status(404).json({
        message: error
    });
});

module.exports = router;