const { jwtToken } = require('../../middlewares/jsonwebtoken');
const { db } = require('../../utils/sequlize');
const users = db.Users;
const bcrypt = require('bcryptjs');

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