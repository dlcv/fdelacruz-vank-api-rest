const { Client } = require('../config/database');
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
        try {
            let client = await Client.create(req.body);
            let message = "Client created successfully";
            logger.info(`201 || ${ message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
            return res.status(201).json({
                message,
            });

        } catch (error) {
            logger.error(`500 || ${ error.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
            return res.status(500).json({
                message: error.message
            });
        }
    }
};

// Update client
clientController.updateClient = async(req, res, next) => {
    // Errors
    let errors = [];

    // Data from request
    const { tax_id, currency } = req.body;

    // Validations
    if (typeof req.body === 'undefined') {
        errors.push({ error: "request body can't be empty" });
    } else {
        // Check validations
        errors = errors.concat(validate.validateTaxId(tax_id))
        errors = errors.concat(validate.validateCurrency(currency))
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
            await Client.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            let message = "Client updated successfully";
            logger.info(`200 || ${ message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
            return res.status(200).json({
                message,
            });

        } catch (error) {
            logger.error(`500 || ${ error.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
            return res.status(500).json({
                message: error.message
            });
        }
    }
};

// Get all clients
clientController.getAllClients = async(req, res, next) => {
    const clients = await Client.findAll();
    return res.json(clients);
};

// Get one clients
clientController.getOneClient = async(req, res, next) => {
    const client = await Client.findAll({
        where: {
            id: req.params.id
        }
    });
    return res.json(client);
};

module.exports = clientController;