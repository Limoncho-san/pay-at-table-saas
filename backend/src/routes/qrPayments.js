// backend/src/routes/qrPayments.js
const qrPaymentController = require('../controllers/qrPaymentController');
const qrRouter = express.Router();
qrRouter.post('/process', qrPaymentController.processQRPayment);
module.exports = qrRouter;