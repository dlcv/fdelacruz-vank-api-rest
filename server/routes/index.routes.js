const { Router } = require("express");
const { logger } = require("../config/logs");
// const { verifyToken, verifyAPIKey } = require("../middlewares/auth");

const { executeIndex } = require("../controllers/index.controller");

const router = Router();

// Index
router.get("/", executeIndex);

module.exports = router;