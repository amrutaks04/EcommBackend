const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    products: [{
        product_id: String,
        quantity: Number
    }]
})
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;