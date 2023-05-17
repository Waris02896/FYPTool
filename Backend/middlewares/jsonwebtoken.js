const JWT = require('jsonwebtoken');
const createError = require('http-errors');

exports.jwtToken = (Option) => {

    return new Promise((resolve, reject) => {

        const payload = {
            Name: Option.fullName,
            email: Option.email,
            verified: Option.verified
        };

        const secret = process.env.SESSION_SECRET;

        let options = {
            expiresIn: "1y",
            issuer: process.env.BASEURL,
            audience: Option.userid,
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
            error: {
                status: createError.Unauthorized().statusCode,
                errorMessage: createError.Unauthorized("User not authorized")
            }
        });
    } else if (req.headers['authorization']) {
        let token = req.headers['authorization'];
        if (token.slice(0, 1) == "\"") {
            token = token.slice(1, token.length).slice(0, token.length - 2)
        }
        // const token = baererToken[1];
        JWT.verify(token, process.env.SESSION_SECRET, (err, result) => {
            if (err) {
                return res.status(err.status || createError.Unauthorized().statusCode).json({
                    error: {
                        err,
                        status: err.status || createError.Unauthorized().statusCode,
                        errorMessage: createError.Unauthorized("User not authorized")
                    }
                });
            } else if (result) {
                const _token = JWT.verify(token, process.env.SESSION_SECRET);
                req.body.User = _token;
                next();
            }
        });
    }
}

