import Joi from "joi";

import { joiPasswordExtendCore } from "joi-password";


const joiPassword = Joi.extend(joiPasswordExtendCore);

export const newUserValidator = (data)=>{

    const newUserSchema = Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        password:joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .required()
      
    })
    const validateUser = newUserSchema.validate(data);
    return validateUser;
}

export const userLoginValidator = (data)=>{

    const newUserSchema = Joi.object({
        email:Joi.string().email().required(),
        password:joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .required()
      
    })
    const validateUser = newUserSchema.validate(data);
    return validateUser;
}