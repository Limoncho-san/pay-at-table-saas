// backend/src/app.js
const express = require('express');
const app = express();
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

module.exports = app;
