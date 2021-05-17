const questionsdb=require('../Models/question.model');

const questionCheck=async (req,res,next)=>{
    const {questionId}=req.params;
    try{
        if(await questionsdb.findById(questionId)){
            next()
        }else{
            return res.status(404).json({
                ok:false,
                message:"Data not found"
            })
        }
    }catch(error){
        console.log(error);
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports=questionCheck;