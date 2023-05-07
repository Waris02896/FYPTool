const joi = require('joi');

const registerUser = joi.object({
    user_id: [
        joi.string(),
        joi.number(),
        joi.symbol(),
        joi.required()
    ],
    firstname: joi
        .string()
        .alphanum()
        .max(20)
        .required(),
    lastname: joi
        .string()
        .alphanum()
        .max(20)
        .required(),
    email: joi
        .string()
        .email()
        .lowercase()
        .required(),
    phone: joi
        .string()
        .pattern(new RegExp('^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$'))
        .required(),
    password: joi
        .string()
        .min(8)
        .max(24)
        .required(),
    confirmPassword: joi
        .ref('password'),
    verified: joi
        .number()
        .required(),
    pic: joi
        .string(),
    token: [
        joi.string(),
        joi.number(),
        joi.symbol()
    ]
});

const email = joi.object({
    email: joi
        .string()
        .email()
        .required(),
    id: joi.string()
});

const loginUser = joi.object({
    user_id: [
        joi.string(),
        joi.number(),
        joi.symbol(),
        joi.required()
    ],
    password: joi
        .string()
        .min(8)
        .max(24)
        .required()
})



module.exports = {
    registerUser,
    email,
    loginUser
}