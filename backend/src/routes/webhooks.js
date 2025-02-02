const webhookController = require('../controllers/webhookController');
const webhookRouter = express.Router();
webhookRouter.post('/handle', webhookController.handleWebhook);
module.exports = webhookRouter;