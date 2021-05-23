const {usersdb}=require('../Models');

const userCheck=async (req,res,next)=>{
    const {id}=req.params;
    try{
        const user=await usersdb.findById(id)
        if(user){
            req.user=user;
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

module.exports=userCheck;