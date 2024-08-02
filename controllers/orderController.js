const Order = require('../models/orderModel');
const Cart = require('../models/cartModel')
const Product = require('../models/productModel');

const placeOrder = async (req, res) => {
    try {
        const userid = req.user;
        const userFetch = await Cart.findOne({ user_id: userid });
        console.log(userFetch);
        if (!userFetch) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const currDate = new Date();
        const estDate = new Date(currDate.setDate(currDate.getDate() + 10));

        let totalAm = 0;
        for (let i = 0; i < userFetch.products.length; i++) {
            let proId = userFetch.products[i];
            const total = await Product.findOne({ id: proId.product_id })
            if (total) {
                totalAm += total.price * proId.quantity;
            }
        }

        const product = await Order.create({
            user_id: userid,
            custName: req.body.custName,
            custPhno: req.body.custPhno,
            custAddress: req.body.custAddress,
            estDelivDate: estDate,
            totAmount: totalAm,
            products: userFetch.products
        })

        await Cart.findOneAndDelete({ user_id: userid });
        return res.status(200).json({ message: "Order created & Cart deleted" })
    } catch (err) {
        console.log(err);
    }
}
module.exports = { placeOrder };