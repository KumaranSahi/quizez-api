const {Schema,model}=require('mongoose')

const questionSchema=new Schema({
    question:{
        type:String,
        required:true
    },options:[{
        content:{
            type:String
        },isCorrect:{
            type:Boolean
        }
    }],multipleCorrect:{
        type:Boolean
    },points:{
        type:Number
    },negativePoints:{
        type:Number
    },quiz:{
        type:Schema.Types.ObjectId,
        ref:'quiz'
    },hint:{
        type:String
    },createdBy:{
        type:Schema.Types.ObjectId,
        ref:'admin'
    }
},{timestamps:true})

const question=model("question",questionSchema)
module.exports=question