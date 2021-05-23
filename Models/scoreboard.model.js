const {Schema,model}=require('mongoose');

const scoreboardSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },quiz:{
        type:Schema.Types.ObjectId,
        ref:'quiz'
    },score:{
        type:Number
    }
},{timestamps:true})

const scoreboard=model("scoreboard",scoreboardSchema);
module.exports=scoreboard;