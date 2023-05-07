const db = require("../../utils/database_connection");
const bcrypt = require('bcryptjs');
const { _sendMail } = require("../../utils/send_email");
const mail = require("../../data/models/Auth/mail");
const { registerUser } = require("../../data/models/Auth/users");


exports.signup = async (req, res) => {

    let user = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [user.email], async (error, result) => {
        if (error) {
            return res.json({
                data: {
                    data: {
                        message: `${user.email} not found`
                    },
                    message: error
                }
            });
        } else if (result.length >= 1) {
            return res.status(200).json({
                data: {
                    message: "User already registered"
                }
            });
        } else if (result.length <= 0) {

            db.query('SELECT user_id FROM users', async (error, result) => {
                if (error) {

                    return res.json({
                        data: {
                            data: {
                                message: "Users are empty"
                            },
                            message: error
                        }
                    });
                } else if (result) {

                    let num = result.length.toString();
                    user.user_id = `${user.firstname.substring(0, 3)}-${user.lastname.substring(0, 3)}-${num.toString().padStart(8, '0')}`;
                    user.verified = 0;

                    try {
                        const _result = await registerUser.validateAsync(user)
                    } catch (error) {
                        return res.status(error.status || 500).json({
                            data: {
                                data: {

                                },
                                error: {
                                    message: error
                                }
                            }
                        });
                    }

                    let password = await bcrypt.hashSync(user.password, await bcrypt.genSaltSync(parseInt(process.env.SALT)));
                    user.password = password;

                    db.query('INSERT INTO users SET ?', {
                        user_id: user.user_id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        password: user.password,
                        phone: user.phone,
                        pic: user.pic
                    }, (error, result) => {
                        if (error) {
                            return res.json({
                                data: {
                                    data: {
                                        message: "Connection failed please try again"
                                    }
                                },
                                message: error
                            });
                        } else if (result) {

                            mail.to = user.email;
                            mail.subject = "Verification for FYP Management System";
                            mail.body = `${process.env.BASEURL}/verifyaccount?id=${user.user_id}`;
                            _sendMail(mail)
                            return res.status(200).json({
                                data: {
                                    data: {
                                        result,
                                        user: {
                                            user_id: user.user_id,
                                            firstname: user.firstname,
                                            lastname: user.lastname,
                                            email: user.email,
                                            phone: user.phone,
                                            verified: false,
                                            pic: user.pic
                                        },
                                        message: "User created successfully. Verification mail sent to your email address"
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    })

}