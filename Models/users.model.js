const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    isAdmin:{
        type:Schema.Types.ObjectId,
        ref:'admin'
    },
    scores:[{
        type:Schema.Types.ObjectId,
        ref:'scoreboard'
    }]
},{timestamps:true})

const user=model("user",userSchema)
module.exports=user;