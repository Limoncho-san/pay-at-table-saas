const posPaymentController = require('../controllers/posPaymentController');
const posRouter = express.Router();
posRouter.post('/process', posPaymentController.processPOSPayment);
module.exports = posRouter;