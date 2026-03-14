const express = require("express");
const router = express.Router();
const { getOrganizerDashboard } = require("../controllers/organizer.controllers");
const verifyToken = require("../middlewares/VeriflyToken"); // adjust path as needed

router.get("/dashboard-data", verifyToken, getOrganizerDashboard);

module.exports = router;
