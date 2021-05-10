const {Schema,model}=require('mongoose');

const quizSchema=new Schema({
    name:{
        type:String,
        required:true
    },questions:[{
        type:Schema.Types.ObjectId,
        ref:'question'
    }],image:{
        type:String
    },createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const quiz=model("quiz",quizSchema)
module.exports=quiz;