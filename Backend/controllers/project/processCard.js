const { OK, INTERNAL_SERVER_ERROR } = require("readable-http-status-codes");
const { db } = require("../../utils/sequlize");

const processCard = db.ProcessCard;
const team = db.Team;

exports.createProcessCard = async (req,res)=>{
    let reqData = req.body;

    let userData = await team.findAll(
        {
            where:{
                project_id: reqData.project_id,
                user_id: reqData.User.user_id,
            }
        }
    )
    .then(async (userData)=>{
        let data = await processCard.create(
            {
                project_id: reqData.project_id,
                name: reqData.name,
                priority: reqData.priority
            }
        )
        .then((data)=>{
            if(data.length >0){
                return res.status(OK).json({
                    data:{
                        response:"Process Created",
                        data
                    }
                })
            }
        })
        .catch((err)=>{
            return res.status(err.status || INTERNAL_SERVER_ERROR).json({
                error:{
                    errorMessage:"Process card cannot be added",
                    err
                }
            })
        })
    })
    .catch((err)=>{
        return res.status(err.status || INTERNAL_SERVER_ERROR).json({
            error:{
                errorMessage:"Process Card cannot be added",
                err
            }
        })
    })
}