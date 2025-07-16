const Joi = require("joi");

module.exports = {
    addUserValidate : {
        body: Joi.object().required().keys({
            userName : Joi.string().required().messages({
                "string.empty" : "ektb 7aga"
            }),
            email : Joi.string().email().required().messages({
                "email.email" : "ektb email"
            }),
            password : Joi.string().required().messages({
                "string.empty" : "ektb pass"
            }),
            role : Joi.string()
        })
    },
        signInvalidate : {
            body:Joi.object().required().keys({
                email : Joi.string().email().required().messages({
                    "string.email" : "ektb email"
                }),
                password : Joi.string().required()
            })
        }

}