const { logger } = require('../config/logs');
const validate = require('../middlewares/validations');

// Module
const clientController = {};

// Save client
clientController.saveClient = async(req, res, next) => {
    // Errors
    let errors = [];

    // Data from request
    const { company_name, internal_code, tax_id, currency, api_quota, bank_id } = req.body;

    // Validations
    if (typeof req.body === 'undefined') {
        errors.push({ error: "request body can't be empty" });
    } else {
        // Check validations
        errors = errors.concat(validate.validateCompanyName(company_name));
        errors = errors.concat(validate.validateInternalCode(internal_code));
        errors = errors.concat(validate.validateTaxId(tax_id))
        errors = errors.concat(validate.validateCurrency(currency))
        errors = errors.concat(validate.validateAPIQuota(api_quota))
        errors = errors.concat(validate.validateBankID(bank_id))
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
        return res.json({
            company_name,
            internal_code,
            tax_id,
            currency,
            api_quota,
            bank_id
        })
    }

    // Send response
    /*
    try {
        let message = "¡API is working fine!";
        logger.info(`200 || ${ message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        return res.json({
            message: "success",
        });

    } catch (error) {
        logger.error(`500 || ${ error.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
        return res.status(500).json({
            message: error.message
        });
    }
    */
};

module.exports = clientController;