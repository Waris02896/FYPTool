const { db } = require("../../utils/sequlize");

const processCard = db.ProcessCard;

exports.processCard = async (req,res)=>{
    let reqData = req.body;

    let data = await processCard.create(
        {
            process_id: reqData.process_id,
            project_id: reqData.project_id,
            name: reqData.name,
            priority: reqData.priority
        }
    )
    .then((data)=>{
        
    })
}