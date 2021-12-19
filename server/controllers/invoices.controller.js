require("dotenv").config();
const { logger } = require("../config/logs");
const { Invoice } = require("../config/database");
const validate = require("../middlewares/validations");


// Module
const invoiceController = {};

// Get all invoices
invoiceController.getAllInvoices = async(req, res, next) => {
    // Errors
    let errors = [];
    let filter = false;

    // Data from request
    const { vendorId, minInvoiceDate, maxInvoiceDate } = req.body;

    // Validations
    if (typeof req.body !== "undefined") {
        // Check validations
        filter = true;
        if (typeof req.body.vendorId !== "undefined") {
            errors = errors.concat(validate.validateVendorID(vendorId));
        }
        if (typeof req.body.minInvoiceDate !== "undefined") {
            errors = errors.concat(validate.validateMinInvoiceDate(minInvoiceDate));
        }
        if (typeof req.body.maxInvoiceDate !== "undefined") {
            errors = errors.concat(validate.validateMaxInvoiceDate(maxInvoiceDate));
        }
    }

    if (errors.length > 0) {
        // Return errors
        for (let index = 0; index < errors.length; index++) {
            logger.error(`400 || ${ errors[index].error } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        }
        return res.status(400).json({
            message: errors
        });

    } else {
        try {
            let invoices;
            if (filter == true) {
                invoices = await Invoice.findAll({
                    where: {
                        vendorId
                    }
                });
            } else {
                invoices = await Invoice.findAll();
            }
            return res.json(invoices);

        } catch (error) {
            logger.error(`500 || ${ error.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
            return res.status(500).json({
                message: error.message
            });
        }
    }

};

module.exports = invoiceController;