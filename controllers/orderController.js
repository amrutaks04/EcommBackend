const Order = require('../models/orderModel');
const Cart = require('../models/cartModel')
const Product = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');

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
            order_id: uuidv4(),
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

const viewOrder = async (req, res) => {
    try {
        const userid = req.user;
        const orderPresent = await Order.find({ user_id: userid });
        console.log(orderPresent);
        if (!orderPresent) {
            return res.status(400).json({ message: "No orders found" });
        }

        let finalArray = [];
        for (let order of orderPresent) {
            let orderArray = [];
            for (let proId of order.products) {
                const product = await Product.findOne({ id: proId.product_id });
                if (product) {
                    orderArray.push(
                        {
                            title: product.title,
                            description: product.description,
                            image: product.image,
                            price: product.price,
                            quantity: order.quantity,
                        }
                    )
                }
            }
            finalArray.push({
                products: orderArray,
                totAmount: order.totAmount,
                orderDate: order.orderDate,
                estDelivDate: order.estDelivDate,
                order_id: order.order_id
            })
        }
        return res.status(200).json(finalArray);
    }  
    catch (err) {
        console.log(err);
    }
}
module.exports = { placeOrder, viewOrder };