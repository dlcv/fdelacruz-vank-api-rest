const { logger } = require('../config/logs');

// Module
const indexController = {};

// Execute index
indexController.executeIndex = async(req, res, next) => {

    // Send response
    try {
        let message = "¡API is working fine!";
        logger.info(`200 || ${ message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        return res.json({
            ok: true,
            result: "success",
            message
        });

    } catch (error) {
        logger.error(`500 || ${ error.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        return res.status(500).json({
            ok: false,
            result: "error",
            message: error.message
        });
    }
};

module.exports = indexController;