let role = require('../../data/models/Auth/roles');
let users = require('../../data/models/Auth/users')
const db = require('../../utils/database_connection');

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

exports.getUsers = (req, res) => {
    db.query('SELECT user_id, firstname, lastname, email, pic FROM users', async (error, result) => {
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
            var user = result;
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