const { Router } = require("express");
const { logger } = require("../config/logs");
// const { verifyToken, verifyAPIKey } = require("../middlewares/auth");

const { getInvoices } = require("../controllers/invoices.controller");

const router = Router();

// Client routes
router.get("/api/v1/invoice/:currency", getInvoices);

module.exports = router;