const { Router } = require("express");
// const { verifyToken, verifyAPIKey } = require("../middlewares/auth");

const { getAllInvoices } = require("../controllers/invoices.controller");

const router = Router();

// Invoices routes
router.get("/api/v1/invoice/", getAllInvoices);

module.exports = router;