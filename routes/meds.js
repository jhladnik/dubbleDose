const express = require("express");
const router = express.Router();
const medsController = require("../controllers/meds");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Med Routes - simplified for now
router.get("/:id", ensureAuth, medsController.getList);

router.post("/createMed", medsController.createMed);

router.put("/takeMed/:id", medsController.takeMed);

router.delete("/deleteMed/:id", medsController.deleteMed);

module.exports = router;