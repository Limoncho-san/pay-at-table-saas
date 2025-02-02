const transactionController = require('../controllers/transactionController');
const transactionRouter = express.Router();
transactionRouter.post('/process', transactionController.processTransaction);
module.exports = transactionRouter;