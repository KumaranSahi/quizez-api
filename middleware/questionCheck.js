const {Question}=require('../Models');

const questionCheck=async (req,res,next)=>{
    const {questionId}=req.params;
    try{
        const question = await Question.findById(questionId);
        if(question){
            req.question=question;
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