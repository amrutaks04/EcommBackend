const express=require('express');
const Router=express.Router();
const productController=require('../controllers/productController');

const auth=require('../middlewares/auth');

Router.get('/products',productController.getAllProducts);
Router.post('/addproduct',auth ,productController.addProduct);
Router.delete('/deleteproduct/:id',productController.deleteproduct);
Router.patch('/updateproduct/:id',productController.updateproduct);

module.exports=Router;
