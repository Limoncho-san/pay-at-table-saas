// backend/src/models/orderModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = sequelize.define('Order', {
    items: { type: DataTypes.JSON, allowNull: false },
    total: { type: DataTypes.FLOAT, allowNull: false }
});
module.exports = Order;