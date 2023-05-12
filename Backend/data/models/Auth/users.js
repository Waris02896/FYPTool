const joi = require('joi');

// const registerUser = joi.object({
//     user_id: [
//         joi.string(),
//         joi.number(),
//         joi.symbol(),
//         joi.required()
//     ],
//     firstname: joi
//         .string()
//         .alphanum()
//         .max(20)
//         .required(),
//     lastname: joi
//         .string()
//         .alphanum()
//         .max(20)
//         .required(),
//     email: joi
//         .string()
//         .email()
//         .lowercase()
//         .required(),
//     phone: joi
//         .string()
//         .pattern(new RegExp('^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$'))
//         .required(),
//     password: joi
//         .string()
//         .min(8)
//         .max(24)
//         .required(),
//     confirmPassword: joi
//         .ref('password'),
//     verified: joi
//         .number()
//         .required(),
//     pic: joi
//         .string(),
//     token: [
//         joi.string(),
//         joi.number(),
//         joi.symbol()
//     ]
// });

// const email = joi.object({
//     email: joi
//         .string()
//         .email()
//         .required(),
//     id: joi.string()
// });

// const loginUser = joi.object({
//     user_id: [
//         joi.string(),
//         joi.number(),
//         joi.symbol(),
//         joi.required()
//     ],
//     password: joi
//         .string()
//         .min(8)
//         .max(24)
//         .required()
// })



// module.exports = {
//     registerUser,
//     email,
//     loginUser
// }

module.exports = (sequlize, DataTypes) => {
    const Users = sequlize.define("users", {
        user_id: {
            type: DataTypes.INTEGER(20),
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
            validate: {
                notNull: {
                    msg: "user_id is required"
                }
            }
        },
        firstname:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true,
                isAlpha: true,
                max: 15
            }
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true,
                isAlpha: true,
                max: 15
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true,
                isEmail: true,
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true
            }
        },
        verified:{
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        pic:{
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Users;
}