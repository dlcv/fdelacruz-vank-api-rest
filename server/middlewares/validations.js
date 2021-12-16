// Validate company name
function validateCompanyName(company_name) {
    let errors = [];
    if (typeof company_name === 'undefined') {
        errors.push({ error: "company_name must be defined in request body" });
    } else {
        if (typeof company_name != 'string') {
            errors.push({ error: "company_name isn't a string, please send it in a string format" });
        } else {
            if ((company_name.trim().length === 0) || (company_name.trim() === '')) {
                errors.push({ error: "company_name can't be null" });
            }
            if ((company_name.length < 2) || (company_name.length > 50)) {
                errors.push({ error: "company_name lenght is invalid, must be between 2 and 50 characters" });
            }
        }
    }
    return errors;
}

// Validate internal code
function validateInternalCode(internal_code) {
    let errors = [];
    if (typeof internal_code === 'undefined') {
        errors.push({ error: "internal_code must be defined in request body" });
    } else {
        if (typeof internal_code != 'string') {
            errors.push({ error: "internal_code isn't a string, please send it in a string format" });
        } else {
            if ((internal_code.trim().length === 0) || (internal_code.trim() === '')) {
                errors.push({ error: "internal_code can't be null" });
            }
            if ((internal_code.length < 2) || (internal_code.length > 10)) {
                errors.push({ error: "internal_code lenght is invalid, must be between 2 and 10 characters" });
            }
        }
    }
    return errors;
}

// Validate tax ID
function validateTaxId(tax_id) {
    let errors = [];
    if (typeof tax_id === 'undefined') {
        errors.push({ error: "tax_id must be defined in request body" });
    } else {
        if (typeof tax_id != 'string') {
            errors.push({ error: "tax_id isn't a string, please send it in a string format" });
        } else {
            if ((tax_id.trim().length === 0) || (tax_id.trim() === '')) {
                errors.push({ error: "tax_id can't be null" });
            }
            if ((tax_id.length < 2) || (tax_id.length > 10)) {
                errors.push({ error: "tax_id lenght is invalid, must be between 2 and 10 characters" });
            }
        }
    }
    return errors;
}

// Validate currency
function validateCurrency(currency) {
    let errors = [];
    if (typeof currency === 'undefined') {
        errors.push({ error: "currency must be defined in request body" });
    } else {
        if (typeof currency != 'string') {
            errors.push({ error: "currency isn't a string, please send it in a string format" });
        } else {
            if ((currency.trim().length === 0) || (currency.trim() === '')) {
                errors.push({ error: "currency can't be null" });
            }
            if (currency.length != 3) {
                errors.push({ error: "currency lenght is invalid, must be 3 characters" });
            }
            const values = ['USD', 'EUR', 'CLP'];
            const found = values.find(element => element == currency.toUpperCase());
            if (typeof found === 'undefined') {
                errors.push({ error: "currency value is invalid: must be USD, EUR or CLP" });
            }
        }
    }
    return errors;
}

// Validate API quota
function validateAPIQuota(api_quota) {
    let errors = [];
    if (typeof api_quota === 'undefined') {
        errors.push({ error: "api_quota must be defined in request body" });
    } else {
        if (typeof api_quota != 'number') {
            errors.push({ error: "api_quota isn't a number, please send it in a number format without quotes" });
        } else {
            if (api_quota < 1) {
                errors.push({ error: "api_quota can't be zero or negative" });
            }
            if (api_quota > 100) {
                errors.push({ error: "api_quota can't be greater than 100" });
            }
        }
    }
    return errors;
}

// Validate bank id's
function validateBankID(bank_id) {
    let errors = [];
    if (typeof bank_id === 'undefined') {
        errors.push({ error: "bank_id must be defined in request body" });
    } else {
        if (Array.isArray(bank_id) == false) {
            errors.push({ error: "bank_id isn't a array, please send it in a array format" });
        } else {
            let counter = 0;
            bank_id.forEach(element => {
                if (!/^\d+$/.test(element)) {
                    errors.push({ error: "bank_id at index [" + counter.toString() + "] have a invalid format: only send numbers in the string" });
                }
                if (parseInt(element) < 1) {
                    errors.push({ error: "bank_id at index [" + counter.toString() + "] is invalid, must be greater than zero" });
                }
                counter++;
            });
        }
    }
    return errors;
}

module.exports = {
    validateCompanyName,
    validateInternalCode,
    validateTaxId,
    validateCurrency,
    validateAPIQuota,
    validateBankID
}