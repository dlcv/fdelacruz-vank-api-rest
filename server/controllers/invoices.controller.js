require("dotenv").config();

const fs = require("fs");
const csv = require("csv-parser");
const { rejects } = require("assert");
const { logger } = require("../config/logs");
const { Invoice } = require("../config/database");

// Module
const invoiceController = {};

// Execute index
invoiceController.getInvoices = async(req, res, next) => {

    // Send response
    try {
        let message = "To-do: get invoices";
        logger.info(`200 || ${ message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        return res.json({
            message
        });

    } catch (error) {
        logger.error(`500 || ${ error.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        return res.status(500).json({
            message: error.message
        });
    }
};

// Private functions

function countInvoicesFromFile() {
    const data = fs.readFileSync(process.env.APP_CSV_DIR_PATH + "/" + process.env.APP_CSV_FILE_NAME).toString();
    let c = data.split("\n").length - 1; // Remove one line because the file have headers
    let msg = `There are ${ c } invoices in external CSV file`
    console.log(msg);
    logger.info(msg);
    return c;
}

const countInvoicesFromDB = () => {
    return new Promise((resolve, reject) => {
        Invoice.count().then(c => {
            let msg = `There are ${ c } invoices in the database`
            console.log(msg);
            logger.info(msg);
            resolve(c);
        });
    });
}

// Process CSV from file
function processInvoicesFromFile() {
    // Count rows in file
    let rowsCSV = countInvoicesFromFile();

    // Count rows in database
    countInvoicesFromDB().then((rowsDB) => {
        // Compare quantities
        if (rowsCSV != rowsDB) {
            // Read file
            fs.createReadStream("./csv/invoices.csv")
                .pipe(csv(["id", "vendorId", "invoiceNumber", "invoiceDate", "invoiceTotal", "paymentTotal", "creditTotal", "bankId", "invoiceDueDate", "paymentDate", "currency"]))
                .on("data", (row) => {
                    // console.log(row);
                    let inv = Invoice.create({
                        id: row.id,
                        vendorId: row.vendorId,
                        invoiceNumber: row.invoiceNumber,
                        invoiceDate: row.invoiceDate,
                        invoiceTotal: row.invoiceTotal,
                        paymentTotal: row.paymentTotal,
                        creditTotal: row.creditTotal,
                        bankId: row.bankId,
                        invoiceDueDate: row.invoiceDueDate,
                        paymentDate: row.paymentDate,
                        currency: row.currency
                    });
                })
                .on("end", () => {
                    let msg = `CSV file successfully processed`;
                    console.log(msg);
                    logger.info(msg);
                });
        } else {
            let msg = `CSV file skipped, don't have changes`;
            console.log(msg);
            logger.info(msg);
        }
    }, (rowsCSV) => {
        console.log("Error");
    });
};

module.exports = invoiceController;

module.exports = {
    invoiceController,
    processInvoicesFromFile
}