
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controllers");
const verifyToken = require("../middlewares/VeriflyToken");


router.post("/bookingevent", verifyToken, bookingController.bookingEvent);
router.get("/sale", verifyToken, bookingController.getEventSalesStats);
router.get("/all", verifyToken, bookingController.getAllBookings);




module.exports = router;
