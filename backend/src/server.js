// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

// Import Routes
const paymentRoutes = require('./routes/payments');
const restaurantRoutes = require('./routes/restaurants');
const authRoutes = require('./routes/auth');
const webhookRoutes = require('./routes/webhooks');
const transactionRoutes = require('./routes/transactions');
const qrPaymentRoutes = require('./routes/qrPayments');
const posPaymentRoutes = require('./routes/posPayments');
const healthRoutes = require('./routes/health');



// Import Middleware
const feeDeductionMiddleware = require('./middleware/feeDeduction');
const webhookHandler = require('./middleware/webhookHandler');
const { errorHandler } = require('./middleware/errorHandler');

// Import Controllers
const qrPaymentController = require('./controllers/qrPaymentController');
const posPaymentController = require('./controllers/posPaymentController');
const webhookController = require('./controllers/webhookController');
const transactionController = require('./controllers/transactionController');

// Import Models
const Transaction = require('./models/Transaction');
const Payment = require('./models/Payment');
const Restaurant = require('./models/Restaurant');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(feeDeductionMiddleware);
app.use(webhookHandler);

// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/qr-payments', qrPaymentRoutes);
app.use('/api/pos-payments', posPaymentRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/health', healthRoutes);

// QR Payment Processing Route
app.post('/api/qr-payments/process', qrPaymentController.processQRPayment);

// POS Payment Processing Route
app.post('/api/pos-payments/process', posPaymentController.processPOSPayment);

// Webhook Handler Route
app.post('/api/webhooks/handle', webhookController.handleWebhook);

// Transaction Processing Route
app.post('/api/transactions/process', transactionController.processTransaction);

// MyPOS API Integration
app.post('/api/payments/initiate', async (req, res) => {
    try {
        const { amount, currency, orderId } = req.body;
        const response = await axios.post('https://api.mypos.com/v1/payments', {
            amount,
            currency,
            orderId,
            callbackUrl: process.env.MYPOS_CALLBACK_URL
        }, {
            headers: { 'Authorization': `Bearer ${process.env.MYPOS_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Payment initiation failed', error: error.message });
    }
});


// Handle MyPOS Webhook Confirmation
app.post('/api/payments/confirm', async (req, res) => {
    try {
        const { transactionId, status } = req.body;
        
        // Find transaction and update status
        const transaction = await Transaction.findOne({ transactionId });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        
        transaction.status = status;
        await transaction.save();
        
        res.json({ message: 'Transaction status updated', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update transaction', error: error.message });
    }
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
