let user = require('../../data/models/Auth/users');
const bcrypt = require('bcryptjs');
const db = require('../../utils/database_connection');
const { jwtToken } = require('../../middlewares/jsonwebtoken');

exports.login = async (req, res) => {

    user = req.body;



    db.query('SELECT user_id, firstname, lastname, password, email, phone, verified, pic FROM users where email = ?', [user.email], async (error, result) => {
        if (error) {
            return res.status(error.status || 500).json({
                data: {
                    data: {

                    },
                    error: {
                        error,
                        status: error.status || 500,
                        message: "Connection failed please try again"
                    }
                }
            });
        } else if (result.length > 0) {
            if (await bcrypt.compare(user.password, result[0].password)) {
                if (result[0].verified == 1) {

                    let _user = result[0];
                    try {
                        _user.token = await jwtToken({
                            userid: _user.user_id
                        });
                        return res.status(200).json({
                            data: {
                                data: {
                                    user: {
                                        user_id: _user.user_id,
                                        firstname: _user.firstname,
                                        lastname: _user.lastname,
                                        email: user.email,
                                        phone: _user.phone,
                                        verified: Boolean(result[0].verified),
                                        pic: _user.pic,
                                        token: _user.token
                                    },
                                    message: "User login Successfully!"
                                }
                            }
                        });
                    } catch (_error) {
                        return res.status(_error.status || 500).json({
                            data: {
                                data: {

                                },
                                error: {
                                    Error: _error.message,
                                    code: _error.code,
                                    status: _error.status || 500,
                                    message: "User login failed!"
                                }
                            }
                        })
                    }


                } else if (result[0].verified == 0) {
                    return res.status(401).json({
                        data: {
                            data: {
                                user: {
                                    user_id: result[0].user_id,
                                    firstname: result[0].firstname,
                                    lastname: result[0].lastname,
                                    email: user.email,
                                    phone: result[0].phone,
                                    verified: Boolean(result[0].verified),
                                    pic: result[0].pic
                                },
                            },
                            error: {
                                message: "User is not verified, please verify account first\nor email lost resend mail"
                            }
                        }
                    });
                }
            } else if (!(await bcrypt.compare(user.password, result[0].password))) {
                return res.status(401).json({
                    data: {
                        data: {

                        },
                        error: {
                            message: "Password is incorrect"
                        }
                    }
                })
            }
        } else if (result.length <= 0) {
            return res.status(200).json({
                data: {
                    data: {
                        message: "User with this email is not registered"
                    }
                }
            })
        }
    });
}