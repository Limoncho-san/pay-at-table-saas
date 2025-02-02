// backend/src/controllers/orderController.js
const Order = require('../models/orderModel');
const createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;
        const order = await Order.create({ items, total });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Order creation failed', details: error.message });
    }
};
module.exports = { createOrder };
