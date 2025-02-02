// backend/src/models/Restaurant.js
const RestaurantSchema = new mongoose.Schema({
    name: String,
    location: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Restaurant', RestaurantSchema);