const { where } = require("sequelize");
const { db } = require("../../utils/sequlize");
const mail = require("../../data/models/Auth/mail");
const { _sendMail } = require("../../utils/send_email");
const statusCode = require("readable-http-status-codes");

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
                
                if (data[0].verified == 0 || data[0].verified == false) {
                    let _data = await users.update(
                        {
                            verified: 1
                        },
                        {
                            where: {
                                user_id: reqData.id
                            }
                        }
                    )
                        .then((_data) => {
                            
                            if (_data.length >= 1) {

                                return res.status(200).json({
                                    data: {
                                        response: "Thank you for joining FYP Tool. Your account is verified. Now you can use feature of FYP Tool",
                                        User: data
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            return res.status(err.status || 500).json({
                                error: {
                                    errorMessage: "Connection failed. Please try again",
                                    err
                                }
                            });
                        })
                }else if(data[0].verified == 1 || data[0].verified == true){
                    console.log("3")
                    return res.status(statusCode.OK).json({
                        data:{
                            response: "Your Email is already verified",
                            User: data
                        }
                    })
                }
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

exports.resendMail = async (req, res) => {
    let reqData = req.body;

    let data = await users.findAll(
        {
            where: {
                email: reqData.email
            },
            limit: 1,
            attributes: {
                exclude: 'password'
            }
        }
    )
        .then(async (data) => {
            if (data.length > 0) {
                if (data[0].verified == 0 || data[0].verified == false) {
                    mail.to = reqData.email;
                    mail.subject = "Verification for FYP Management System";
                    mail.body = `${process.env.BASEURL}/verifyaccount?id=${data.user_id}`;
                    mailData = await _sendMail(mail)
                    return res.status(statusCode.OK_200).json({
                        data:{
                            response:"Verification mail sent successful",
                            User: data
                        }
                    })
                }
            } else if (data[0].verified == 1 || data[0].verified == true) {
                return res.status(200).json({
                    data: {
                        response: "Your email is already verified"
                    }
                });
            }
        })
}