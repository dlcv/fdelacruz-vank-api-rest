require("dotenv").config();

const Sequelize = require("sequelize");
const BankModel = require("../models/bank.model");
const ClientModel = require("../models/client.model");
const InvoiceModel = require("../models/invoice.model");

// DATABASE HOST
const DB_HOST = process.env.DB_HOST;

// DATABASE USER
const DB_USER = process.env.DB_USER;

// DATABASE PASS
const DB_PASS = process.env.DB_PASS;

// DATABASE PORT
const DB_PORT = process.env.DB_PORT;

// DATABASE NAME
const DB_NAME = process.env.DB_NAME;

// DATABASE DIALECT
const DB_DIALECT = process.env.DB_DIALECT;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false
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