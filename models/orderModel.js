const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    custName: {
        type: String,
        required: [true, 'Name required']
    }, custPhno: {
        type: String,
        required: [true, 'Phone number required']
    }, custAddress: {
        type: String,
        required: [true, 'Address required']
    }, orderDate: {
        type: Date,
        default:Date.now
    }, estDelivDate: {
        type: Date
    }, products: [{
        product_id: String,
        quantity: Number
    }], totAmount: {
        type: Number
    }, orderStatus: {
        type: String
    }
})
const Order = mongoose.model('orders', orderSchema);
module.exports = Order;