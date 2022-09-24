const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const medsController = require("../controllers/meds");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, medsController.getList);

router.post("/createMed", upload.single("file"), medsController.createMed);

router.put("/takeMed/:id", medsController.takeMed);

router.delete("/deleteMeds/:id", medsController.deleteMed);

module.exports = router;