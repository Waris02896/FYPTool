const { db } = require('../../utils/sequlize');
const users = db.Users;
const bcrypt = require('bcryptjs');
const mail = require("../../data/models/Auth/mail");
const { _sendMail } = require('../../utils/send_email');

exports.signup = async (req, res) => {

    const reqData = req.body;

    if (reqData.user.password == reqData.user.confirmPassword) {
        reqData.user.password = await bcrypt.hashSync(reqData.user.password, await bcrypt.genSaltSync(parseInt(process.env.SALT)));

        let data = await users.findOrCreate({
            where: {
                email: reqData.user.email
            },
            defaults: {
                firstname: reqData.user.firstname,
                lastname: reqData.user.lastname,
                email: reqData.user.email,
                password: reqData.user.password,
                pic: reqData.user.pic,
                verified: false,
            },
            attributes: { exclude: 'password' }
        })
            .then(async (data) => {

                if (data[1] == false) {
                    return res.status(200).json({
                        message: {
                            data: {
                                response: "This email is already registered",
                                data
                            }
                        }
                    })
                } else if (data[1] == true) {
                    

                    mail.to = data[0].email;
                    mail.subject = "Verification for FYP Management System";
                    mail.body = `${process.env.BASEURL}/verifyaccount?id=${data[0].user_id}`;
                    console.log(mail)
                    try {
                        await _sendMail(mail)
                    } catch (error) {
                        return res.status(error.status || 500).json({
                            error:{
                                error
                            }
                        })
                    }
                    
                    return res.status(200).json({
                        message: {
                            data: {
                                response: "Account created successfully. Please check email for Account verification",
                                User: data
                            }
                        }
                    })
                }
            })
            .catch((err) => {
                return res.status(err.status || 500).json({
                    message: {
                        errorMessage: "Account create Unsuccessful",
                        err
                    }
                })
            })
    }
}