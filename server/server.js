require('./config/app');
const { logger } = require('./config/logs');

const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration
var corsOptions = {
    origin: process.env.SERVER_URL + ":" + process.env.APP_PORT
};
app.use(cors(corsOptions));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

// Routes
app.use(require('./routes/index.routes'));

// Webserver
app.listen(process.env.APP_PORT, () => {
    console.log('Listening port: ', process.env.APP_PORT);
    logger.info(`Server started and running on ${process.env.SERVER_URL}:${process.env.APP_PORT}`);
});