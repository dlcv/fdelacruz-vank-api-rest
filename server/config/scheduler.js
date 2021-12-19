const fs = require("fs");
const https = require("https");

const schedule = require("node-schedule");

const invoiceController = require("../controllers/invoices.controller")

const rule = new schedule.RecurrenceRule();
// rule.hour = 0;
rule.second = 0;


// Directory for CSV"s files
var dir = "./csv";

// Create directory if not exist
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Create empty CSV file
const file = fs.createWriteStream("./csv/invoices.csv");

// External URL for CSV file
const url = "https://gist.githubusercontent.com/rogelio-meza-t/f70a484ec20b8ea43c67f95a58597c29/raw/41f289c605718e923fc1fad0539530e4d0413a90/invoices.csv";

// Job
const Job = schedule.scheduleJob(rule, function() {
    console.log("Init schedule job");
    // Get external file
    https.get(url, response => {
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