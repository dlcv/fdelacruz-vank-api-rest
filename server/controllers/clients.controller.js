const { Client, ClientBank, Bank } = require('../config/database');
const { logger } = require('../config/logs');
const validate = require('../middlewares/validations');

// Module
const clientController = {};

// Save client
clientController.saveClient = async(req, res, next) => {
    // Errors
    let errors = [];

    // Data from request
    const { companyName, internalCode, taxId, currency, apiQuota, banks } = req.body;

    // Validations
    if (typeof req.body === 'undefined') {
        errors.push({ error: "request body can't be empty" });
    } else {
        // Check validations
        errors = errors.concat(validate.validateCompanyName(companyName));
        errors = errors.concat(validate.validateInternalCode(internalCode));
        errors = errors.concat(validate.validateTaxId(taxId))
        errors = errors.concat(validate.validateCurrency(currency))
        errors = errors.concat(validate.validateAPIQuota(apiQuota))
        errors = errors.concat(validate.validateBanksID(banks))
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
            let client = await Client.create({
                companyName,
                internalCode,
                taxId,
                currency,
                apiQuota
            });

            // Add banksId to client
            banks.forEach(element => {
                Bank.create({
                    bankId: element,
                    clientId: client.id
                })
            });

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
    const { taxId, currency } = req.body;

    // Validations
    if (typeof req.body === 'undefined') {
        errors.push({ error: "request body can't be empty" });
    } else {
        // Check validations
        errors = errors.concat(validate.validateTaxId(taxId))
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
    const clients = await Client.findAll({
        include: ["bank"],
    });
    return res.json(clients);
};

// Get one clients
clientController.getOneClient = async(req, res, next) => {
    const client = await Client.findByPk(req.params.id, { include: ["bank"] });
    return res.json(client);
};

module.exports = clientController;