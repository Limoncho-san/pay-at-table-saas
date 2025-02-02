// backend/src/controllers/paymentController.js
const axios = require('axios');
exports.initiatePayment = async (req, res) => {
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
};