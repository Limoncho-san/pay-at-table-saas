// backend/src/models/Transaction.js
const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    transactionId: String,
    amount: Number,
    status: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Transaction', TransactionSchema);