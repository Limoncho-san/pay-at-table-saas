// backend/src/routes/payments.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Initiate payment route
router.post('/initiate', paymentController.initiatePayment);

module.exports = router;