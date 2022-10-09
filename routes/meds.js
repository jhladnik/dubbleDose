const express = require("express");
const router = express.Router();
const medsController = require("../controllers/meds");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Med = require("../models/Med");

//Med Routes - simplified for now
router.get("/list ", ensureAuth, medsController.getList);

router.post("/add", medsController.createMed);

router.put("/takeMed/:id", medsController.takeMed);

router.delete("/deleteMed/:id", medsController.deleteMed);

router.get("/history", ensureAuth, medsController.getHistory);

module.exports = router;