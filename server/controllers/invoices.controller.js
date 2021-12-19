const { logger } = require("../config/logs");
const { Invoice } = require("../config/database");

const fs = require("fs");
const csv = require("csv-parser");
const { rejects } = require("assert");

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
    const data = fs.readFileSync("./csv/invoices.csv").toString();
    console.log("CSV: ", data.split("\n").length - 1);
    return data.split("\n").length - 1; // Removed header"s file
}

const countInvoicesFromDB = () => {
    return new Promise((resolve, reject) => {
        Invoice.count().then(c => {
            console.log("There are " + c + " invoices!")
            resolve(c);
        });
    });

    // try {
    //     let rows = await Invoice.count().then(c => {
    //         // console.log("There are " + c + " projects!")
    //         rows = c;
    //     });
    //     console.log("DB: ", rows);
    //     return rows;
    // } catch (error) {
    //     logger.error(`500 || ${ error.message }`);
    // }

}

// Process CSV from file
function processInvoicesFromFile() {
    // Variables
    let rowsCSV;

    // Count rows in file
    rowsCSV = countInvoicesFromFile();

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
                    logger.info(`CSV file successfully processed`);
                });
        } else {
            logger.info(`CSV file skipped, don't have changes`);
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