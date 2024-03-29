const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const medsController = require("../controllers/meds");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, medsController.getProfile);
router.get("/list", ensureAuth, medsController.getList);
router.get("/addDelete", ensureAuth, medsController.getAddDelete);
router.post("/add", ensureAuth, medsController.createMed);
router.get("/history",ensureAuth, medsController.getHistory);
router.get("/calendar", ensureAuth, medsController.getCalendar);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;