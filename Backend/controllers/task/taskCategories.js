const { findAllQuery, db } = require("../../utils/sequlize");
const taskCategories = db.TaskCategories;
// var db = require('../../utils/sequlize');


exports.getAllTaskCategories = async (req, res, next) => {

    let data = taskCategories.findAll()
        .then((data) => {
            if (data.length > 0) {

                req.taskCategory_count = data.length;

                return res.status(200).json({
                    data: {
                        taskCategory: data
                    }
                });
            } else if (data == 0) {
                req.taskCategory_count = 0;

                return res.status(200).json({
                    data: {
                        response: "No task categories available"
                    }
                });
            }
        })
        .catch((err) => {
            return res.status(err.status || 500).json({
                    error: {
                        errorMessage: "Task Category fetch unsuccessful",
                        err
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
                    data: {
                        response: "Task Category added successfully",
                        taskCategory: data
                    }
                });
            }
        }).catch((err) => {
            return res.status(err.status || 500).json({
                error: {
                    errorMessage: "Task Category not added successfully",
                    err
                }
            });
        })
}