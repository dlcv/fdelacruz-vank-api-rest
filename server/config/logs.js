const winston = require("winston");

// Logger configuration
const logConfiguration = {
    "transports": [
        new winston.transports.File({
            filename: "logs/server.log"
        })
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `${ process.env.APP_NAME }`
        }),
        winston.format.timestamp({
            format: "MMM-DD-YYYY HH:mm:ss"
        }),
        winston.format.printf(info => `${ info.level } - ${ info.label } -  ${ [info.timestamp] }: ${ info.message }`),
    )
};

// Create logger
const logger = winston.createLogger(logConfiguration);

module.exports = {
    logger,
    logConfiguration
}