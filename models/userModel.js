const mongoose=require('mongoose');
const bcrypt =require('bcryptjs');


 const userSchema=new mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    username:{
        type:String,
    },password:{
        type:String,
        required:[true,"password is required"]
    },email:{
        type:String,
        unique:true,
        required:[true,"Email is required"]
    }
 })

 //Hash password before saving user to database
 //.pre->is the middleware
 userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next(); //if there is no changes in the password(if it is aldready bcryted/hashed) save and go to next middleware
    }
    
    //if there is any changes bcrypt and saves the hashed password
    const salt = await bcrypt.genSalt(10);//10 bytes(the computational power of the bcryption)
    this.password = await bcrypt.hash(this.password,salt);
    next();
 })
  
 const User=mongoose.model('login',userSchema);
 module.exports=User;