require('dotenv').config();
const jwt = require('jsonwebtoken');
const { logger } = require('../config/logs');

let verifyToken = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        let error = 'Access denied: you must specify the token in the header';
        logger.error(`401 || ${ error } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        return res.status(401).json({
            message: error
        });
    } else {
        jwt.verify(token, process.env.SERVER_TOKEN_SEED, (error, decoded) => {
            if (error) {
                logger.error(`401 || ${ error } - ${ req.originalUrl } - ${ req.method}  - ${ req.ip }`);
                return res.status(401).json({
                    message: error
                });
            }
            req.user = decoded.user;
        });
        next();
    }
};

let verifyAPIKey = (req, res, next) => {
    const key = req.header('x-api-key');
    if (!key) {
        let error = 'Access denied: you must specify the x-api-key in the header';
        logger.error(`401 || ${ error } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        return res.status(401).json({
            message: error
        });

    } else {
        if (key != process.env.SERVER_API_KEY) {
            let error = 'Access denied: your x-api-key in the header is invalid';
            logger.error(`401 || ${ error } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
            return res.status(401).json({
                message: error
            });
        } else
            next();
    }
};

module.exports = {
    verifyToken,
    verifyAPIKey
}