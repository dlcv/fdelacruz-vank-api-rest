require("dotenv").config();

const Sequelize = require("sequelize");
const BankModel = require("../models/bank.model");
const ClientModel = require("../models/client.model");
const InvoiceModel = require("../models/invoice.model");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    // logging: true // process.env.DB_LOGGING
})

const Bank = BankModel(sequelize, Sequelize);
const Client = ClientModel(sequelize, Sequelize);
const Invoice = InvoiceModel(sequelize, Sequelize);

Client.hasMany(Bank, { as: "bank" });
Bank.belongsTo(Client, {
    foreignKey: "clientId",
    as: "client",
});

sequelize.sync({ force: false }).then(() => {
    console.log("Sync tables")
})

module.exports = {
    Bank,
    Client,
    Invoice
}