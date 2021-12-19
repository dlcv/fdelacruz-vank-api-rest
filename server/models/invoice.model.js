module.exports = (sequelize, type) => {
    var Invoice = sequelize.define("invoice", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vendorId: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false
        },
        invoiceNumber: {
            type: type.STRING(50),
            allowNull: false
        },
        invoiceDate: {
            type: type.DATEONLY,
            allowNull: false,
        },
        invoiceTotal: {
            type: type.FLOAT,
            allowNull: false,
        },
        paymentTotal: {
            type: type.FLOAT,
            allowNull: false,
        },
        creditTotal: {
            type: type.FLOAT,
            allowNull: false,
        },
        bankId: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false
        },
        invoiceDueDate: {
            type: type.DATEONLY,
            allowNull: false,
        },
        paymentDate: {
            type: type.DATEONLY,
            allowNull: false,
        },
        currency: {
            type: type.STRING(3),
            allowNull: false
        }
    });

    return Invoice;
}