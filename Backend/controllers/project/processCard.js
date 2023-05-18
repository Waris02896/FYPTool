const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require("readable-http-status-codes");
const { db } = require("../../utils/sequlize");

const processCard = db.ProcessCard;
const team = db.Team;

exports.createProcessCard = async (req,res)=>{
    let reqData = req.body;

    let userData = await team.findAll(
        {
            where:{
                project_id: reqData.project_id,
                user_id: reqData.User.aud,
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
            console.log("Hi")
            if(data){
                return res.status(OK).json({
                    data:{
                        response:"Process Created",
                        data
                    }
                })
            }
        })
        .catch((err)=>{
            return res.status(err.statusCode || INTERNAL_SERVER_ERROR).json({
                error:{
                    errorMessage:err.errors[0].message,
                    err
                }
            })
        })
    })
    .catch((err)=>{
        return res.status(err.status || UNAUTHORIZED).json({
            error:{
                errorMessage:"You are not part of this project",
                err
            }
        })
    })
}