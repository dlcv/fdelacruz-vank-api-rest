const { Router } = require("express");
const { logger } = require("../config/logs");
const { verifyAPIKey } = require("../middlewares/auth");

const { executeIndex } = require("../controllers/index.controller");

const router = Router();

// Index
router.get("/", verifyAPIKey, executeIndex);

module.exports = router;