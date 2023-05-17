const { db } = require("../../utils/sequlize");
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('readable-http-status-codes');
const projects = db.Projects;

exports.createProject = async (req, res) => {
    reqData = req.body;
    // return res.json({
    //     reqData
    // })

    let project_id;
    let project = await projects.findAll(
        {
            limit: 1,
            order: [
                [
                    'project_id', 'DESC'
                ]
            ]
        }
    )
        .then((project) => {
            if (project.length >= 1) {
                let proj = project[0].project_id.split('-')
                project_id = (parseInt(proj[proj.length - 1]) + 1).toString().padStart(8, 0);
            } else if (project.length == 0) {
                project_id = (0).toString().padStart(8, 0)
            }
        });

    let data = await projects.create(
        {
            project_id: `${reqData.name.substring(0, 5)}-${project_id}`,
            name: reqData.name,
            user_id: reqData.User.aud,
            description: reqData.description,
            type: reqData.type
        }
    )
        .then((data) => {
            if (data) {
                return res.status(OK).json({
                    data: {
                        response: "Project Successfully Created",
                        project: {
                            data
                        }
                    }
                });
            } else if (!data) {
                return res.status(NOT_FOUND).json({
                    error: {
                        errorMessage: "Project Create Unsuccessfully"
                    }
                })
            }
        })
        .catch((err) => {
            return res.status(err.status || INTERNAL_SERVER_ERROR).json({
                error: {
                    errorMessage: "Project Create Unsuccessfully",
                    err
                }
            })
        })
}

exports.projectList = async (req, res) => {
    let reqData = req.body;
    // return res.json({
    //     reqData
    // })

    let data = await projects.findAll(
        {
            where: {
                user_id: reqData.User.aud
            }
        }
    )
        .then((data) => {
            if (data.length > 0) {
                return res.status(OK).json({
                    data: {
                        projects: {
                            data
                        }
                    }
                })
            } else if (data.length == 0) {
                return res.status(OK).json({
                    data: {
                        response: "No project available for this user"
                    }
                })
            }
        })
        .catch((err) => {
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: {
                    response: "Connection Failed",
                    errorMessage
                }
            })
        })
}