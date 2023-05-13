const { jwtToken } = require('../../middlewares/jsonwebtoken');
const { db } = require('../../utils/sequlize');
const users = db.Users;
const bcrypt = require('bcryptjs');

// let user = require('../../data/models/Auth/users');

// const db = require('../../utils/database_connection');
// const { jwtToken } = require('../../middlewares/jsonwebtoken');

// exports.login = async (req, res) => {

//     user = req.body;



//     db.query('SELECT user_id, firstname, lastname, password, email, verified, pic FROM users where email = ?', [user.email], async (error, result) => {
//         if (error) {
//             return res.status(error.status || 500).json({
//                 data: {
//                     data: {

//                     },
//                     error: {
//                         error,
//                         status: error.status || 500,
//                         message: "Connection failed please try again"
//                     }
//                 }
//             });
//         } else if (result.length > 0) {
//             if (await bcrypt.compare(user.password, result[0].password)) {
//                 if (result[0].verified == 1) {

//                     let _user = result[0];
//                     try {
//                         _user.token = await jwtToken({
//                             userid: _user.user_id
//                         });
//                         return res.status(200).json({
//                             data: {
//                                 data: {
//                                     user: {
//                                         user_id: _user.user_id,
//                                         firstname: _user.firstname,
//                                         lastname: _user.lastname,
//                                         email: user.email,
//                                         phone: _user.phone,
//                                         verified: Boolean(result[0].verified),
//                                         pic: _user.pic,
//                                         token: _user.token
//                                     },
//                                     message: "User login Successfully!"
//                                 }
//                             }
//                         });
//                     } catch (_error) {
//                         return res.status(_error.status || 500).json({
//                             data: {
//                                 data: {

//                                 },
//                                 error: {
//                                     Error: _error.message,
//                                     code: _error.code,
//                                     status: _error.status || 500,
//                                     message: "User login failed!"
//                                 }
//                             }
//                         })
//                     }


//                 } else if (result[0].verified == 0) {
//                     return res.status(401).json({
//                         data: {
//                             data: {
//                                 user: {
//                                     user_id: result[0].user_id,
//                                     firstname: result[0].firstname,
//                                     lastname: result[0].lastname,
//                                     email: user.email,
//                                     phone: result[0].phone,
//                                     verified: Boolean(result[0].verified),
//                                     pic: result[0].pic
//                                 },
//                             },
//                             error: {
//                                 message: "User is not verified, please verify account first\nor email lost resend mail"
//                             }
//                         }
//                     });
//                 }
//             } else if (!(await bcrypt.compare(user.password, result[0].password))) {
//                 return res.status(401).json({
//                     data: {
//                         data: {

//                         },
//                         error: {
//                             message: "Password is incorrect"
//                         }
//                     }
//                 })
//             }
//         } else if (result.length <= 0) {
//             return res.status(200).json({
//                 data: {
//                     data: {
//                         message: "User with this email is not registered"
//                     }
//                 }
//             })
//         }
//     });
// }

exports.login = async (req, res, next) => {
    const reqData = req.body;

    let data = users.findAll({
        where: {
            email: reqData.email
        },
        limit: 1
    })
        .then(async (data) => {
            if (data.length > 0) {
                if (await bcrypt.compare(reqData.password, data[0].password)) {
                    if ((data[0].verified == 1) || (data[0].verified == true)) {
                        token = await jwtToken({
                            userid: data[0].user_id,
                            fullName: data[0].fullname,
                            email: data[0].email,
                            verified: data[0].verified
                        })
                            .then((token) => {
                                data[0].token = token
                                
                                return res.status(200).json({
                                    data: {
                                        response: "User login Successfully!",
                                        User: {
                                            user_id: data[0].user_id,
                                            firstname: data[0].firstname,
                                            lastname: data[0].lastname,
                                            fullName: data[0].fullName,
                                            email: data[0].email,
                                            verified: data[0].verified,
                                            pic: data[0].pic,
                                            token: data[0].token,
                                            createdAt: data[0].createdAt,
                                            updatedAt: data[0].updatedAt
                                        }
                                    }
                                })
                            })
                    } else if ((data[0].verified == 0) || (data[0].verified == false)) {
                        return res.status(200).json({
                            data: {
                                response: "User is not verified, please verify account first\nor request for resend Verification Email if lost resend mail"
                            }
                        })
                    }
                } else if (!await bcrypt.compare(reqData.password, data[0].password)) {
                    return res.status(401).json({
                        error: {
                            errorMessage: "Password is incorrect"
                        }
                    })
                }
            } else if (data[0].length == 0) {
                return res.status(200).json({
                    data: {
                        response: "This email is not registered"
                    }
                })
            }
        })
}