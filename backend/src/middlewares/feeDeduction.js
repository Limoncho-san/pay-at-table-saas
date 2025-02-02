module.exports = (req, res, next) => {
    if (req.body.amount) {
        req.body.amount = req.body.amount * 0.985; // Deduct 1.5% fee
    }
    next();
};