const Cart = require('../models/cartModel');
const Product = require('../models/productModel');


const addToCart = async (req, res) => {
    try {
        const userCid = req.user;
        const cart = await Cart.findOne({ user_id: userCid });
        if (cart) {
            const index = cart.products.findIndex(products => products.product_id === req.body.products.product_id);
            if (index != -1) {
                cart.products[index].quantity = req.body.products.quantity;
                await cart.save();//for saving the updated quantity in mongo
                return res.status(200).json({
                    message: "quantity updated"
                })
            }
            else {
                const updateCart = await Cart.findOneAndUpdate({ user_id: userCid }, {
                    $push: {
                        products: req.body.products
                    }
                }, { new: true })

                return res.status(200).json({
                    message: "updated"
                })
            }
        }
        else {
            const addCart = await Cart.create({
                user_id: userCid,
                products: req.body.products
            })
            return res.status(200).json({
                message: "added"
            })
        }
    } catch (err) {
        console.log(err);
    }
}

const getCart = async (req, res) => {
    try {
        const userCid = req.user;
        const userFound = await Cart.findOne({ user_id: userCid });
        if (!userFound) {
            return res.status(404).json({ message: 'user not found' });
        }
        let cartArray = [];
        let total =0;
        let totalArray={};
        for (let i = 0; i < userFound.products.length; i++) {
            const cart = userFound.products[i];
            const productDetail = await Product.findOne({ id: cart.product_id });
            if (productDetail) {
                const subTotal = productDetail.price *cart.quantity;
                cartArray.push({
                    title: productDetail.title,
                    description: productDetail.description,
                    price: productDetail.price,
                    quantity: cart.quantity,
                    subTotal:subTotal
                })
              total+=subTotal;
            }
         totalArray ={cartArray,total};
        }
        return res.status(200).json(totalArray);
    } catch (err) {
        console.log(err);
    }
}


const deleteProduct = async (req, res) => {
    try {  
        const userCid = req.user;
        const userFound = await Cart.findOne({ user_id: userCid });
        if (!userFound) {
            return res.status(404).json({ message: "user not found" });
        }
else{   
        if(userFound.products.length<=1){
            if(userFound.products[0].product_id==req.params.product_id){
                await Cart.findOneAndDelete({user_id:userCid});
                return res.status(200).json({message:" All products deleted"});
            }
return res.status(200).json({message:"productId not matched"});
        }
        else{
            const delId = req.params.product_id;
            const filtered = userFound.products.filter((e)=>{
               return e.product_id!=delId;
            })
            userFound.products=filtered;
            await userFound.save();
            let initialL=userFound.products.length;
            let finalL=filtered.length;
if(initialL!=finalL){
    return res.status(200).json({message:" Product Deleted"});
}
else{
    return res.status(200).json({message:"Product not deleted"});
}
            
        } }
      
        // const deleteId = await Cart.updateOne(
        //     { user_id: userCid },
        //     {
        //         $pull: { products: { product_id: delId } }
        //     });
        // if (deleteId.nModified > 0) {
        //     return res.status(200).json({ message: "product deleted" });
        // }
        // else {
        //     return res.status(404).json({ message: "product not found" });
        // }
     }catch (err) {
        console.log(err);
    }
}


module.exports = { addToCart, getCart, deleteProduct };