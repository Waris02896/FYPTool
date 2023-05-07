

const { findAllQuery } = require("../../utils/sequlize");


exports.getTaskCategories = async (req, res, next) => {


    try {
        const task = await findAllQuery({
            model: "tasks",
        });

        if (task.length == 0) {
            return res.status(200).json({
                data: {
                    data: {
                        message: "There is no task available"
                    }
                }
            });
        } else if (task.length > 0) {
            return res.status(200).json({
                data: {
                    tasks: {
                        task
                    }
                }
            });
        }
    } catch (err) {
        return res.status(err.status || 500).json({
            data: {
                data: {

                },
                error: {
                    err
                }
            }
        });
    }

    // db.query("SELECT * FROM taskCategories", async (error, result) => {
    //     if (error) {
    //         return res.json({
    //             data: {
    //                 data: {

    //                 },
    //                 error: {
    //                     error,
    //                     message: "Connection failed try again"
    //                 }
    //             }
    //         })
    //     } else if (result.length >= 1) {
    //         return res.status(200).json({
    //             data: {
    //                 data: {
    //                     task: {
    //                         result
    //                     }
    //                 }
    //             }
    //         })
    //     } else if (result.length <= 0) {
    //         return res.status(200).json({
    //             data: {
    //                 data: {

    //                 },
    //                 error: {
    //                     message: "There is no task categories available"
    //                 }
    //             }
    //         })
    //     }
    // });
}