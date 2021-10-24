const Joi = require('joi');


//Signup Validation

const signUpValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

//Login Validation

const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}
//Password Validation

const passwordValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

module.exports.signUpValidation = signUpValidation;
module.exports.loginValidation = loginValidation;
module.exports.passwordValidation = passwordValidation;