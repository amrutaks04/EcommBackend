const express = require('express');
const app=express();
const Productroutes=require('./routes/productRoutes');
const Userroutes=require('./routes/userRoutes');
const Cartroutes = require('./routes/cartRoutes');
const Orderroutes = require('./routes/orderRoutes');
const cors = require('cors');
const bodyparser=require('body-parser');

app.use(bodyparser.json());

app.use(cors());

const mongoose=require('mongoose');

mongoose.connect(
    'mongodb+srv://amruta:amruta14@cluster0.rgbuaxs.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>{
        console.log("MongoDb connected");
    });
    app.set("view engine","ejs"); 

    app.use('/',Productroutes);
    app.use('/user',Userroutes);
    app.use('/carts',Cartroutes);
    app.use('/orders',Orderroutes);

    app.listen(3000,()=>{
        console.log("server is running on port 3000");
    });
