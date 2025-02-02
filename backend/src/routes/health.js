// backend/src/routes/health.js
const healthRouter = express.Router();
healthRouter.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});
module.exports = healthRouter;
