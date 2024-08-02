const express=require('express');
const Router=express.Router();
const userController=require('../controllers/userController');


Router.post('/register',userController.register);
Router.post('/login',userController.login);
Router.patch('/updateUser/:id',userController.updateUser);
Router.delete('/deleteUser/:id',userController.deleteUser);

module.exports=Router;