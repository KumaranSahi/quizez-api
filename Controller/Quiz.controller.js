const quizdb=require('../Models/quiz.model')
const admindb=require('../Models/admin.model')

module.exports.createQuiz=async (req,res)=>{
    const {name,image}=req.body;
    const {id}=req.params
    try{
        const admin=await admindb.findOne({adminUser:id})
        const newQuiz=await quizdb.create({
            name:name,
            image:image,
            createdBy:admin._id,
            questions:[]
        })
        admin.createdQuizes.push(newQuiz._id)
        await admin.save()
        return res.status(201).json({
            ok:true,
            data:newQuiz
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            message:"Error creating Quiz"
        })
    }
}

module.exports.getAllQuizes=async (req,res)=>{
    try{
        const quizes=await quizdb.find();
        return res.status(200).json({
            ok:true,
            data:quizes
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            message:"Error loading the quizes"
        })
    }
}

module.exports.getQuiz=async(req,res)=>{
    const {quizId}=req.params
    try{
        const quiz=await (await quizdb.findById(quizId)).execPopulate('questions')
        return res.status(200).json({
            ok:true,
            data:quiz
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            message:"Error loading the quiz"
        })
    }
}