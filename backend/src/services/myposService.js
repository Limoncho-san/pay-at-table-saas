const axios = require('axios');
const initiatePayment = async (orderId, amount) => {
    try {
        const response = await axios.post('https://api.mypos.com/payment', { orderId, amount });
        return response.data;
    } catch (error) {
        throw new Error('MyPOS API call failed');
    }
};
module.exports = { initiatePayment };