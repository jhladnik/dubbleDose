const express = require("express");
const router = express.Router();
const medsController = require("../controllers/meds");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Med = require("../models/Med");

//Med Routes - simplified for now
router.get("/ ", ensureAuth, medsController.getList);

router.post("/add", medsController.createMed);

router.put("/takeMed", medsController.takeMed);

router.delete("/deleteMed", medsController.deleteMed);

module.exports = router;