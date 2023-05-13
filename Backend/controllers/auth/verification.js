const { where } = require("sequelize");
const { db } = require("../../utils/sequlize");

const users = db.Users;

// const db = require("../../utils/database_connection");
// const { email } = require("../../data/models/Auth/users");
// const { _sendMail } = require("../../utils/send_email");
// const mail = require("../../data/models/Auth/mail");
// const err = require('http-errors');

exports.verifyemail = async (req, res) => {
    const reqData = req.query;
    // return res.status(200).json({
    //     message:{
    //         reqData
    //     }
    // })
    const data = await users.findAll(
        {
            limit: 1,
            where: {
                user_id: reqData.id
            },
            order: [
                [
                    'createdAt', 'DESC'
                ]
            ]
        }
    )
        .then(async (data) => {
            if (data.length >= 1) {
                data = await users.update(
                    {
                        verified: 1
                    },
                    {
                        where: {
                            user_id: reqData.id
                        }
                    }
                )
                    .then((data) => {
                        if (data.length >= 1) {
                            return res.status(200).json({
                                data: {
                                    response: "Thank you for joining FYP Tool. Your account is verified. Now you can use feature of FYP Tool"
                                }
                            })
                        }
                    })
                    .catch((err) => {
                        return res.status(err.status || 500).json({
                            error: {
                                errorMessage: "Connection failed. Please try again",
                                err
                            }
                        })
                    })
            }
            else if (data.length == 0) {

                return res.status(200).json({
                    data: {
                        response: "You are not registered to User FYP Tool with this email. Please Sign up first to FYP Tool"
                    }
                })
            }
        })
}

// exports.verifyemail = (req, res) => {
//     const id = req.query.id;

//     db.query('SELECT user_id, verified FROM users WHERE user_id = ?', [id], async (error, result) => {
//         if (error) {
//             return res.json({
//                 data: {
//                     data: {

//                     },
//                     error: {
//                         message: "Connection failed please try again",
//                         error
//                     }
//                 }
//             })
//         } else if (result.length > 1) {
//             return res.status(207).json({
//                 data: {
//                     data: {

//                     },
//                     error: {
//                         message: "Id contains multiple registeration"
//                     }
//                 }
//             })
//         } else if (result.length <= 0) {
//             return res.status(200).json({
//                 data: {
//                     data: {

//                     },
//                     error: {
//                         message: "No user available to verify"
//                     }
//                 }
//             })
//         } else if (result[0].verified == "1") {
//             return res.status(200).json({
//                 data: {
//                     data: {
//                         message: "Your account is already verified"
//                     }
//                 }
//             })
//         }
//         else if (result.length == 1) {
//             db.query('UPDATE users SET ? where ?', [{ verified: 1 }, { user_id: id }], async (error, result) => {
//                 if (error) {
//                     return res.status(408).json({
//                         data: {
//                             data: {
//                             },
//                             error: {
//                                 message: "Connection timeout please try again",
//                                 error
//                             }
//                         }
//                     })
//                 } else if (result) {

//                     return res.status(200).json({
//                         data: {
//                             data: {
//                                 message: "Your account successfully verified"
//                             }
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }

exports.resendMail = async (req, res) => {
    let _email = req.body;

    try {
        const _result = await email.validateAsync(_email)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            data: {
                data: {

                },
                error: {
                    message: "Email format is not valid",
                }
            }
        })
    }

    db.query('SELECT * FROM users WHERE email = ?', [_email.email], async (error, result) => {
        if (error) {
            return res.status(error.status || 500).json({
                data: {
                    data: {

                    }
                },
                error: {
                    error
                }
            })
        } else if (result.length > 0) {
            let user = result[0];
            user.verified = Boolean(user.verified);
            mail.to = user.email;
            mail.subject = "Verification for FYP Management System";
            mail.body = `${process.env.BASEURL}/verifyaccount?id=${user.user_id}`;
            _sendMail(mail);
            return res.status(200).json({
                data: {
                    data: {
                        user: {
                            user_id: user.user_id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            phone: user.phone,
                            verified: user.verified,
                            pic: user.pic
                        },
                        message: "Verification mail sent to your email address"
                    }
                }
            })
        } else if (result.length <= 0) {
            return res.status(200).json({
                data: {
                    data: {

                    },
                    message: `No user with ${_email.email}`
                }
            })
        }
    })
}