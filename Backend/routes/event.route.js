const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller"); 
const verifyToken = require("../middlewares/VeriflyToken");
const  upload  = require("../middlewares/multer");




router.post("/create/event", verifyToken,  upload.single("image"), eventController.createEvent);
router.get('/allEvent', verifyToken, eventController.getAllEvents);

router.get('/viewDetail/:id', verifyToken, eventController.getEventById);

router.put('/create/event/:id', verifyToken, eventController.updateEvent);
router.delete('/create/event/:id', verifyToken, eventController.deleteEvent);












module.exports = router;