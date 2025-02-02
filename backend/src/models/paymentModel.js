// backend/src/models/paymentModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Payment = sequelize.define('Payment', {
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }
});
module.exports = Payment;