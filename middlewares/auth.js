const jwt=require('jsonwebtoken');

const auth =(req,res,next)=>{
    //form front end the access token will come as 'Bearer accesstoken'
    // const token = req.header('Authorization').replace("Bearer"," "); 
    //   or
    const token = req.header('Authorization').split(" ")[1];
    if(!token) return res.status(401).json({error:"Token required"});
    try{
        const decoded = jwt.verify(token,"secret_key");
        console.log(decoded);
        req.user = decoded.userId;
        next();
    }catch(err){ 
        res.status(401).json({error:"Invalid Token"}); //happens when the token expires or when it is invalid
    }
};
module.exports = auth;