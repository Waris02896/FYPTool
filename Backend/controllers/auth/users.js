const { OK, NOT_FOUND } = require('readable-http-status-codes');
const { db } = require('../../utils/sequlize');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op
const users = db.Users;

// let role = require('../../data/models/Auth/roles');
// let users = require('../../data/models/Auth/users')
// const db = require('../../utils/database_connection');

exports.getroles = (req, res) => {
    db.query('SELECT * FROM roles', async (error, result) => {
        if (error) {
            return res.status(400).json({
                data: {
                    data: {

                    },
                    error: {
                        error
                    }
                }
            });
        } else if (result.length >= 1) {
            role = result;
            return res.status(200).json({
                data: {
                    data: {
                        role
                    }
                }
            })
        } else if (result.length <= 0) {
            return res.status(200).json({
                data: {
                    data: {
                        message: "Roles are empty"
                    }
                }
            })
        }
    });
}

exports.getUsers = async (req, res) => {

    let reqData = req.query
    // return res.json({
    //     a:reqData.pageSize,
    //     b:reqData.page,
    //     c:reqData.pageSize * reqData.page
    // })

    let data = await users.findAll(
        {
            limit: parseInt(reqData.pageSize),
            offset: reqData.pageSize * reqData.page,
            order: [
                [
                    'user_id', 'ASC'
                ]
            ],
            attributes: { exclude: 'password' }
        }
    )
        .then((data) => {
            if (data.length > 0) {
                return res.status(200).json({
                    data: {
                        users: data
                    }
                })
            }
        })
        .catch((err) => {
            return res.status(err.status || 500).json({
                data: {
                    errorMessage: "Failed to get list of users",
                    err
                }
            })
        })
}

exports.getUsersByQuery = (req, res) => {
    let reqData = req.body;

    let data = users.findAll(
        {
            where: {
                [Op.or]:
                {
                    fullname: {
                        [Op.like]: `%${reqData.fullname}%`
                    },
                    email: {
                        [Op.like]: `%${reqData.email}%`
                    }
                }
            },
            limit: 5
        }
    )
        .then((data) => {
            if (data.length > 0) {
                return res.status(OK).json({
                    data: {
                        Users: {
                            data
                        }
                    }
                })
            } else if (data.length == 0) {
                return res.status(OK).json({
                    data: {
                        response: "No Users available"
                    }
                })
            }
        })
        .catch((err) => {
            return res.status(NOT_FOUND).json({
                error: {
                    errorMessage: "Connection error",
                    err
                }
            })
        })
}