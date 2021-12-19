const { Router } = require("express");
const { logger } = require("../config/logs");
// const { verifyToken, verifyAPIKey } = require("../middlewares/auth");

const { saveClient, getAllClients, getOneClient, updateClient } = require("../controllers/clients.controller");

const router = Router();

// Client routes
router.post("/api/v1/client/", saveClient);
router.get("/api/v1/client/", getAllClients);
router.get("/api/v1/client/:id", getOneClient);
router.put("/api/v1/client/:id", updateClient);

module.exports = router;