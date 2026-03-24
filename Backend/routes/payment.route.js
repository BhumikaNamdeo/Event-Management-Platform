const express = require('express');
const payemntControllers = require('../controllers/payment.controllers');
const router = express.Router();

router.post('/create-checkout-session', payemntControllers.createCheckoutSession);
router.get('/ticket/:bookingId', payemntControllers.downloadTicketPDF);
router.post('/update-status', payemntControllers.updatePaymentStatus);

module.exports = router;
