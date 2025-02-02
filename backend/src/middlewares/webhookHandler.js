module.exports = (req, res, next) => {
    console.log('Webhook received:', req.body);
    next();
};