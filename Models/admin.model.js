const {Schema,model} = require('mongoose')

const adminSchema=new Schema({
    createdQuizes:[{
        type:Schema.Types.ObjectId,
        ref:'quiz'
    }],
    createdQuestions:[{
        type:Schema.Types.ObjectId,
        ref:'question'
    }],
    adminUser:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const admin=model("admin",adminSchema)
module.exports=admin;