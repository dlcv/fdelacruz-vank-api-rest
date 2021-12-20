// require("dotenv").config();
const { logger } = require("../config/logs");
const { Invoice } = require("../config/database");
const validate = require("../middlewares/validations");

// Module
const invoiceController = {};

// Get all invoices
invoiceController.getAllInvoices = async(req, res, next) => {
    // Errors
    let filter = {};
    let errors = [];

    // Data from request
    const { vendorId, minInvoiceDate, maxInvoiceDate } = req.body;

    // Validations
    if (req.body.constructor === Object && Object.keys(req.body).length !== 0) {
        // Check validations
        if (typeof req.body.vendorId !== "undefined") {
            errors = errors.concat(validate.validateVendorID(vendorId));
            filter.vendorId = vendorId;
        }
        if (typeof req.body.minInvoiceDate !== "undefined") {
            errors = errors.concat(validate.validateMinInvoiceDate(minInvoiceDate));
            filter.invoiceDate = [{
                $gte: new Date(minInvoiceDate)
            }];
        }
        if (typeof req.body.maxInvoiceDate !== "undefined") {
            errors = errors.concat(validate.validateMaxInvoiceDate(maxInvoiceDate));
            filter.invoiceDate = [{
                $lte: new Date(maxInvoiceDate)
            }];
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
                let invoices = await Invoice.findAll({
                    attributes: ['id', 'vendorId', 'invoiceNumber', 'invoiceTotal', 'paymentTotal', 'creditTotal', 'bankId'],
                    where: filter
                });
                return res.json(invoices);

            } catch (error) {
                logger.error(`500 || ${ error.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    } else {
        try {
            let invoices = await Invoice.findAll({
                attributes: ['id', 'vendorId', 'invoiceNumber', 'invoiceTotal', 'paymentTotal', 'creditTotal', 'bankId']
            });
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