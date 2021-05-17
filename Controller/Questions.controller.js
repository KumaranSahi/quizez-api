const questionsdb=require('../Models/question.model')
const quizdb=require('../Models/quiz.model')
const admindb=require('../Models/admin.model')

module.exports.createQuestion=async (req,res)=>{
    const {question,options,multipleCorrect,points,negativePoints,quiz:quizId,hint}=req.body
    const {id}=req.params
    try{
        const admin=await admindb.findOne({adminUser:id})
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
        const createQuestion={
            id:newQuestion._id,
            question:newQuestion.question,
            options:newQuestion.options,
            multipleCorrect:newQuestion.multipleCorrect,
            points:newQuestion.points,
            negativePoints:newQuestion.negativePoints,
            hint:newQuestion.hint
        }

        return res.status(201).json({
            ok:"true",
            data:createQuestion,
            message:"Question created"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            message:"Error creating Question"
        })
    }
}

module.exports.editQuestion=async (req,res)=>{
    const {question,options,multipleCorrect,points,negativePoints,quiz:quizId,hint,createdBy}=req.body;
    const {questionId}=req.params;
    try{
        const newQuestion=await questionsdb.findByIdAndUpdate(questionId,{
            question:question,
            options:options,
            multipleCorrect:multipleCorrect,
            points:points,
            negativePoints:negativePoints,
            hint:hint,
        })

        const editQuestion={
            id:newQuestion._id,
            question:newQuestion.question,
            options:newQuestion.options,
            multipleCorrect:newQuestion.multipleCorrect,
            points:newQuestion.points,
            negativePoints:newQuestion.negativePoints,
            hint:newQuestion.hint
        }

        return res.status(201).json({
            ok:"true",
            data:editQuestion,
            message:"Question Edited"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            message:"Error Editing Question"
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