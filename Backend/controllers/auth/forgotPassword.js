const { email } = require("../../data/models/Auth/users");
const db = require("../../utils/database_connection");
const mail = require("../../data/models/Auth/mail");
const err = require('http-errors');
const bcrypt = require('bcryptjs');
const { _sendMail } = require("../../utils/send_email");

exports.forgotPassword = async (req, res) => {
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
        let user = result[0];
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

            if (user.verified == '0') {
                return res.status(200).json({
                    data: {
                        data: {

                        },
                        message: "User not verified. Please verify user first"
                    }
                });
            } else if (user.verified == '1') {
                user.verified = Boolean(user.verified);
                db.query('INSERT INTO changePasswordStatus SET ?', { status: 0 }, (error, result) => {
                    if (error) {
                        return res.status(error.status || err.RequestTimeout).json({
                            data: {
                                data: {

                                },
                                error,
                                message: error.status || err.RequestTimeout
                            }
                        })
                    } else if (result) {
                        mail.to = user.email;
                        mail.subject = "Verification for FYP Management System";
                        mail.body = `${process.env.BASEURL}/changePassword?email=${user.email}&id=${result.insertId}`;
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
                                    message: "Please confirm if you want to reset your password"
                                }
                            }
                        });
                    }
                });
            }
        } else if (result.length <= 0) {
            return res.status(200).json({
                data: {
                    data: {

                    },
                    message: `No user with ${_email.email}`
                }
            });
        }
    });
}

exports.changePassword = async (req, res) => {
    const _email = {
        email: req.query.email,
        id: req.query.id
    }

    try {
        const _result = await email.validateAsync(_email)
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

    db.query('SELECT * FROM changePasswordStatus WHERE id = ?', [_email.id], async (error, result) => {
        if (error) {
            return res.status(error.status || 500).json({
                data: {
                    data: {

                    },
                    status: error.status || 500,
                    error
                }
            })
        } else if (result[0].status == '0') {
            db.query('SELECT * FROM users WHERE email = ?', [_email.email], async (error, result) => {
                let user = result[0];
                if (error) {
                    return res.status(error.status || err.RequestTimeout.statusCode).json({
                        data: {
                            data: {

                            },
                            error: {
                                message: "Connection failed please try again",
                                status: error.status || err.RequestTimeout.statusCode,
                                error
                            }
                        }
                    });
                } else if (result.length > 1) {
                    return res.status(207).json({
                        data: {
                            data: {

                            },
                            error: {
                                message: "Id contains multiple registeration"
                            }
                        }
                    });
                } else if (result.length <= 0) {
                    return res.status(200).json({
                        data: {
                            data: {

                            },
                            error: {
                                message: "Provided email is not correct"
                            }
                        }
                    });
                } else if (result.length == 1) {

                    let pass = await bcrypt.hashSync(user.user_id, await bcrypt.genSaltSync(parseInt(process.env.SALT))).substring(0, 16);
                    user.password = await bcrypt.hashSync(pass, await bcrypt.genSaltSync(parseInt(process.env.SALT)));
                    db.query('UPDATE users SET ? where ?', [{ password: user.password }, { user_id: user.user_id }], async (error, result) => {
                        if (error) {
                            return res.status(408).json({
                                data: {
                                    data: {
                                    },
                                    error: {
                                        message: "Connection timeout please try again",
                                        error
                                    }
                                }
                            })
                        } else if (result) {

                            mail.to = user.email;
                            mail.subject = "password changed successfully";
                            mail.body = `Your new password: ${pass}`;
                            _sendMail(mail);

                            db.query('UPDATE changePasswordStatus SET ? where ?', [{ status: 1 }, { id: _email.id }], async (error, result) => {
                                if (error) {
                                    return res.status(error.status || 500).json({
                                        data: {
                                            data: {

                                            },
                                            status: error.status || 500,
                                            error
                                        }
                                    })
                                } else if (result) {
                                    return res.status(200).json({
                                        data: {
                                            data: {
                                                message: "Your password has change succesfully. Please check email for new password"
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else if (result[0].status == '1') {
            return res.status(200).json({
                data: {
                    data: {
                        message: "URL is already used. Please check mail for new password"
                    }
                }
            });
        }
    });
}

// exports.forgotPassword = (req, res) => {
//     let reqData = req.body;

//     let data = 
// }