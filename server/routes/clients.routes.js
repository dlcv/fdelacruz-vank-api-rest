const { Router } = require("express");
const { verifyToken } = require("../middlewares/auth");

const { saveClient, getAllClients, getOneClient, updateClient } = require("../controllers/clients.controller");

const router = Router();

// Client routes
router.post("/api/v1/client/", verifyToken, saveClient);
router.get("/api/v1/client/", verifyToken, getAllClients);
router.get("/api/v1/client/:id", verifyToken, getOneClient);
router.put("/api/v1/client/:id", verifyToken, updateClient);

module.exports = router;