const express=require('express');
const Router=express.Router();
const cartController=require('../controllers/cartController');
const auth = require('../middlewares/auth');

Router.post('/cart',auth,cartController.addToCart);
Router.get('/getcart',auth,cartController.getCart);
Router.delete('/deletePro/:product_id',auth,cartController.deleteProduct);

module.exports=Router;