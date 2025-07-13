const { StatusCodes, getReasonPhrase } = require("http-status-codes");


module.exports = (scemaValid) =>{
    return(req,res,next)=>{
        var  validation = [];
        var validationResult = scemaValid.body.validate(req.body)
        if (validationResult.error) {
            validation.push(validationResult.error.details[0].message)
        }
        if(validation.length){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message:validation.join(),
                code: getReasonPhrase(StatusCodes.GATEWAY_TIMEOUT)})
    }
    next();
}
}