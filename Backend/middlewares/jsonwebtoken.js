const JWT = require('jsonwebtoken');
const createError = require('http-errors');

exports.jwtToken = (Option) => {
    return new Promise((resolve, reject) => {
        const payload = {};

        const secret = process.env.SESSION_SECRET;

        let options = {
            expiresIn: "6h",
            issuer: process.env.BASEURL,
            audience: Option.userid
        }

        JWT.sign(payload, secret, options, (error, token) => {
            if (error) {
                throw reject(error);

            } else if (token) {
                resolve(token);
            }
        })

    });
}

exports.verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(createError.Unauthorized().statusCode).json({
            data: {
                data: {

                },
                error: {
                    status: createError.Unauthorized().statusCode,
                    message: createError.Unauthorized("User not authorized")
                }
            }
        });
    } else if (req.headers['authorization']) {
        const authHeader = req.headers['authorization'];
        const baererToken = authHeader.split(' ');
        const token = baererToken[1];
        JWT.verify(token, process.env.SESSION_SECRET, (err, result) => {
            if (err) {
                return res.status(err.status || createError.Unauthorized().statusCode).json({
                    data: {
                        data: {
                        },
                        error: {
                            err,
                            status: err.status || createError.Unauthorized().statusCode,
                            message: createError.Unauthorized("User not authorized")
                        }
                    }
                });
            } else if (result) {
                const _token = JWT.verify(token, process.env.SESSION_SECRET);
                req.token = _token;
                next();
            }
        });
    }
}

