const { UNAUTHORIZED, INTERNAL_SERVER_ERROR, OK, NOT_FOUND } = require("readable-http-status-codes");
const { db } = require("../../utils/sequlize");
const team = db.Team;
const project = db.Projects;

exports.addUser = async (req, res) => {
    let reqData = req.body;

    let projectData = await project.findOne(
        {
            where: {
                project_id: reqData.project_id,
                user_id: reqData.User.aud
            }
        }
    )
        .then(async (projectData) => {
            // return res.json({
            //     projectData
            // })
            if(projectData != null){
                let teamData = await team.findOne(
                    {
                        where: {
                            project_id: reqData.project_id,
                            user_id: reqData.User.aud,
                            rights: "Project Manager"
                        }
                    }
                )
                    .then(async (teamData) => {
                        if (teamData != null) {
                            let teams = await team.create(
                                {
                                    project_id: reqData.project_id,
                                    user_id: reqData.user_id,
                                    rights: reqData.rights
                                }
                            )
                                .then((teams) => {
                                    // return res.json({
                                    //     team
                                    // })
                                    return res.status(OK).json({
                                        data: {
                                            response: "Member added to the project",
                                            teams
                                            // teams
                                        }
                                    });

                                })
                        }
                        else if (teamData.length == null) {
                            return res.status.json({
                                error: {
                                    errorMessage: "You are not part of project team"
                                }
                            });
                        }
                    })
                    .catch((err) => {

                        return res.status(INTERNAL_SERVER_ERROR).json({
                            error: {
                                errorMessage: "You are not part of Project",
                                err
                            }
                        })
                    })
            }else if(projectData == null){
                return res.status(NOT_FOUND).json({
                    error:{
                        errorMessage:"Project not available"
                    }
                })
            }

        })
        .catch((err) => {
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: {
                    errorMessage: "Member not added to the project",
                    err
                }
            });
        })
}

// if(projectData.length > 0){
//     let data = await team.create(
//         {
//             project_id: reqData.project_id,
//             user_id: reqData.User.user_id,
//             rights: reqData.rights
//         }
//     )
//     .then((data)=>{
//         if(data.length > 0){
//             return res.status(OK).json({
//                 data:{
//                     response:"User added to the project"
//                 }
//             })
//         }
//     })
// }else if(projectData.length == 0){
//     return res.status(UNAUTHORIZED).json({
//         error:{
//             errorMessage:"User does not have right to add member in project"
//         }
//     })
// }