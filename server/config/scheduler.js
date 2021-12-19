require("dotenv").config();

const fs = require("fs");
const https = require("https");
const schedule = require("node-schedule");
const { logger } = require("../config/logs");
const invoiceController = require("../controllers/invoices.controller");

// Rules for scheduling
const rule = new schedule.RecurrenceRule();
if (process.env.APP_UPDATE_CSV_EVERY_MINUTE.toString() === "YES") {
    rule.second = 0; // Update everytime that seconds in clock is equal to 0
} else {
    rule.hour = Number(process.env.APP_UPDATE_CSV_SCHEDULE_HOUR);
    rule.minute = Number(process.env.APP_UPDATE_CSV_SCHEDULE_MINUTE);
}

// Create directory if not exist
if (!fs.existsSync(process.env.APP_CSV_DIR_PATH)) {
    fs.mkdirSync(process.env.APP_CSV_DIR_PATH);
}

// Create empty CSV file
const file = fs.createWriteStream(process.env.APP_CSV_DIR_PATH + "/" + process.env.APP_CSV_FILE_NAME);

// Job
const Job = schedule.scheduleJob(rule, function() {
    let msg = "Init schedule job";
    console.log(msg);
    logger.info(msg);
    // Get external file
    https.get(process.env.APP_EXTERNAL_CSV_URL, response => {
        let msg = "Getting external CSV file";
        console.log(msg);
        logger.info(msg);
        // Write local file
        var stream = response.pipe(file);
        // Finish
        stream.on("finish", function() {
            let msg = "Readed invoices from external CSV file";
            console.log(msg);
            logger.info(msg);
            invoiceController.processInvoicesFromFile();
        });
    });
});

module.exports = {
    Job
}