const Product =require("../models/productModel");
const { v4: uuidv4 } = require('uuid');

const getAllProducts = async (req,res)=>{
    // console.log(req.user);
    try{
        const products = await Product.find();
        res.send(products);
    }catch(err){
        console.log(err);
    }
};

const addProduct = async(req,res)=>{
    try{
        const product=await Product.create({
            id:uuidv4(),
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            image:req.body.image,
            rating:req.body.rating
        })
        res.send(product);
    }catch(err){
        console.log(err);
    }
}

const deleteproduct = async(req,res)=>{
   const productId=req.params.id;
    try{
const delproduct=await Product.deleteOne({id:productId});
res.send(delproduct);
    }catch(err){
        console.log(err);
    }
}

const updateproduct=async(req,res)=>{
const proId=req.params.id;
    try{
const updateproducts=await Product.updateOne({id:proId},{
    id:req.body.id,
    title:req.body.title,
    description:req.body.description,
    category:req.body.category,
    price:req.body.price,
    image:req.body.image,
    rating:req.body.rating
});
res.send(updateproducts);
    }catch(err){
        console.log(err);
    }
}
module.exports={getAllProducts,addProduct,deleteproduct,updateproduct};