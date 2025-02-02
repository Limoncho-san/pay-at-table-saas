const restaurantController = require('../controllers/restaurantController');
const restaurantRouter = express.Router();
restaurantRouter.get('/', restaurantController.getAllRestaurants);
module.exports = restaurantRouter;