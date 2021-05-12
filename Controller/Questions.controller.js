const questionsdb=require('../Models/question.model')
const quizdb=require('../Models/quiz.model')
const admindb=require('../Models/admin.model')

module.exports.createQuestion=async (req,res)=>{
    const {question,options,multipleCorrect,points,negativePoints,quiz:quizId,hint,createdBy}=req.body
    try{
        const admin=await admindb.findOne({adminUser:createdBy})
        const quiz=await quizdb.findById(quizId)
        const newQuestion=await questionsdb.create({
            question:question,
            options:options,
            multipleCorrect:multipleCorrect,
            points:points,
            negativePoints:negativePoints,
            quiz:quizId,
            hint:hint,
            createdBy:admin._id
        })
        quiz.questions.push(newQuestion._id);
        await quiz.save();
        admin.createdQuestions.push(newQuestion._id);
        await admin.save();
        return res.status(201).json({
            ok:"true",
            message:"Question created"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            message:"Error creating Question"
        })
    }
}

module.exports.deleteQuestion=async (req,res)=>{
    const {questionId}=req.params;
    try{
        const question=await questionsdb.findById(questionId);
        await admindb.findByIdAndUpdate(question.createdBy,{$pull:{createdQuestions:questionId}})
        await quizdb.findByIdAndUpdate(question.quiz,{$pull:{questions:questionId}})
        await question.deleteOne()
        return res.status(201).json({
            ok:true,
            message:"Question deleted successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            message:"Error Deleting Question"
        })
    }
}