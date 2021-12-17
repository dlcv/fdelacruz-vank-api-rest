// Validate company name
function validateCompanyName(companyName) {
    let errors = [];
    if (typeof companyName === 'undefined') {
        errors.push({ error: "companyName must be defined in request body" });
    } else {
        if (typeof companyName != 'string') {
            errors.push({ error: "companyName isn't a string, please send it in a string format" });
        } else {
            if ((companyName.trim().length === 0) || (companyName.trim() === '')) {
                errors.push({ error: "companyName can't be null" });
            }
            if ((companyName.length < 2) || (companyName.length > 50)) {
                errors.push({ error: "companyName lenght is invalid, must be between 2 and 50 characters" });
            }
        }
    }
    return errors;
}

// Validate internal code
function validateInternalCode(internalCode) {
    let errors = [];
    if (typeof internalCode === 'undefined') {
        errors.push({ error: "internalCode must be defined in request body" });
    } else {
        if (typeof internalCode != 'string') {
            errors.push({ error: "internalCode isn't a string, please send it in a string format" });
        } else {
            if ((internalCode.trim().length === 0) || (internalCode.trim() === '')) {
                errors.push({ error: "internalCode can't be null" });
            }
            if ((internalCode.length < 2) || (internalCode.length > 10)) {
                errors.push({ error: "internalCode lenght is invalid, must be between 2 and 10 characters" });
            }
        }
    }
    return errors;
}

// Validate tax ID
function validateTaxId(taxId) {
    let errors = [];
    if (typeof taxId === 'undefined') {
        errors.push({ error: "taxId must be defined in request body" });
    } else {
        if (typeof taxId != 'string') {
            errors.push({ error: "taxId isn't a string, please send it in a string format" });
        } else {
            if ((taxId.trim().length === 0) || (taxId.trim() === '')) {
                errors.push({ error: "taxId can't be null" });
            }
            if ((taxId.length < 2) || (taxId.length > 10)) {
                errors.push({ error: "taxId lenght is invalid, must be between 2 and 10 characters" });
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
function validateAPIQuota(apiQuota) {
    let errors = [];
    if (typeof apiQuota === 'undefined') {
        errors.push({ error: "apiQuota must be defined in request body" });
    } else {
        if (typeof apiQuota != 'number') {
            errors.push({ error: "apiQuota isn't a number, please send it in a number format without quotes" });
        } else {
            if (apiQuota < 1) {
                errors.push({ error: "apiQuota can't be zero or negative" });
            }
            if (apiQuota > 100) {
                errors.push({ error: "apiQuota can't be greater than 100" });
            }
        }
    }
    return errors;
}

// Validate bank id's
function validateBanksID(banksId) {
    let errors = [];
    if (typeof banksId === 'undefined') {
        errors.push({ error: "banksId must be defined in request body" });
    } else {
        if (Array.isArray(banksId) == false) {
            errors.push({ error: "banksId isn't a array, please send it in a array format" });
        } else {
            let counter = 0;
            banksId.forEach(element => {
                if (element < 1) {
                    errors.push({ error: "banksId at index [" + counter.toString() + "] is invalid, must be greater than zero" });
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
    validateBanksID
}