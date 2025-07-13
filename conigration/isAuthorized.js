const jwt = require('jsonwebtoken');
const rbac = require("../rbac/rbac"); 
const {StatusCodes} = require("http-status-codes");// Import the RBAC instance
module.exports = (endPoint)=>{
    return async(req,res,next) =>{
let bareToken = req.headers.authorization ; 
let token = bareToken.split(" ")[1];
var decoded = jwt.verify(token, 'shhhhh');
const isAllowed = await rbac.can(decoded.role, endPoint);
req.user = decoded; 
if(isAllowed){
    next();    
}else{
    res.status(StatusCodes.UNAUTHORIZED).json({
        message: "You are not authorized to access this resource"
    });
}
    }
}