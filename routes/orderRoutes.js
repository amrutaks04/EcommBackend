const express = require('express');
const Router = express.Router();
const orderController = require('../controllers/orderController');

const auth=require('../middlewares/auth');

Router.post('/createOrder',auth,orderController.placeOrder);
Router.get('/getOrder',auth,orderController.viewOrder);

module.exports=Router;