require("dotenv").config();

const fs = require("fs");
const https = require("https");
const schedule = require("node-schedule");
const invoiceController = require("../controllers/invoices.controller");

const rule = new schedule.RecurrenceRule();
// rule.hour = 0;
rule.second = 0;

// Create directory if not exist
if (!fs.existsSync(process.env.APP_CSV_DIR_PATH)) {
    fs.mkdirSync(process.env.APP_CSV_DIR_PATH);
}

// Create empty CSV file
const file = fs.createWriteStream(process.env.APP_CSV_DIR_PATH + "/" + process.env.APP_CSV_FILE_NAME);

// Job
const Job = schedule.scheduleJob(rule, function() {
    console.log("Init schedule job");
    // Get external file
    https.get(process.env.APP_EXTERNAL_CSV_URL, response => {
        console.log("Getting external CSV file");
        // Write local file
        var stream = response.pipe(file);
        // Finish
        stream.on("finish", function() {
            console.log("Readed invoices from URL");
            invoiceController.processInvoicesFromFile();
        });
    });
});

module.exports = {
    Job
}