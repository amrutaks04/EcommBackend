const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const reigsterDetails = await User.create({
            id: uuidv4(),
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        res.send(reigsterDetails);
    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email})
     if(!user){
        return res.status(404).json({message:"User not found"});
     }
     const isValidPassword = await bcrypt.compare(password,user.password);
     if(!isValidPassword){
        return res.status(401).json({message:"Invalid password"});
     }
     const token=jwt.sign({userId:user.id},"secret_key",{
        expiresIn:"1h",
     });
     res.json({token})
    } catch (err) {
        console.log(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const updateId = req.params.id;
        const updateUsers = await User.updateOne({ id: updateId }, {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        res.send(updateUsers);
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleteId = req.params.id;
        const deleteUsers = await User.deleteOne({ id:deleteId});
        res.send(deleteUsers);
    } catch (err) {
        console.log(err);
    }
} 

module.exports = { register, login, updateUser, deleteUser };