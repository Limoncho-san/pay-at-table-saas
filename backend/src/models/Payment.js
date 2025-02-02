// backend/src/models/Payment.js
const PaymentSchema = new mongoose.Schema({
    orderId: String,
    amount: Number,
    currency: String,
    status: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Payment', PaymentSchema);