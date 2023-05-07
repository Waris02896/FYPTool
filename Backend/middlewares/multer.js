const multer = require("multer")
// const storage=multer.memoryStorage()

const storage=multer.diskStorage({destination:function (req,file,cb){
    // console.log('saved')
    cb(null,'./data/temporary/')
},
filename:function (req,file,cb){
    // console.log("here in filename \n"+JSON.stringify(req.body))
cb(null,req.body.f_name+'_'+req.body.l_name+'_'+file.fieldname+'.'+file.mimetype.split('/')[1])
}
})

const upload=multer({storage:storage})


module.exports=upload