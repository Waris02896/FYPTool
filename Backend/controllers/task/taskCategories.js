const { findAllQuery, db } = require("../../utils/sequlize");
const taskCategories = db.taskCategories;
// var db = require('../../utils/sequlize');


exports.getAllTaskCategories = async (req, res, next) => {

    let data = taskCategories.findAll()
        .then((data) => {
            if (data.length > 0) {

                req.taskCategory_count = data.length;

                return res.status(200).json({
                    message: {
                        data: {
                            taskCategory: data
                        }
                    }
                });
            } else if (data == 0) {
                req.taskCategory_count = 0;

                return res.status(200).json({
                    message: {
                        data: "No task categories available"
                    }
                });
            }
        })
        .catch((err) => {
            return res.status(err.status || 500).json({
                data: {
                    data: {

                    },
                    error: {
                        errorMessage: "Task Category fetch unsuccessful",
                        err
                    }
                }
            });
        });
}

exports.createTaskCategory = async (req, res, next) => {
    const reqData = req.body;

    let data = await taskCategories.bulkCreate(
        reqData.taskCategory
    )
        .then((data) => {
            if (data.length > 0) {
                return res.status(200).json({
                    message: {
                        data: {
                            response: "Task Category added successfully",
                            taskCategory: data
                        }
                    }
                });
            }
        }).catch((err) => {
            return res.status(err.status || 500).json({
                message: {
                    error: {
                        errorMessage: "Task Category not added successfully",
                        err
                    }
                }
            });
        })
}