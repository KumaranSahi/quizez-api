const quizdb=require('../Models/quiz.model')
const admindb=require('../Models/admin.model')

module.exports.createQuiz=async (req,res)=>{
    const {name,image,description}=req.body;
    const {id}=req.params
    try{
        const admin=await admindb.findOne({adminUser:id})
        const newQuiz=await quizdb.create({
            name:name,
            image:image,
            createdBy:admin._id,
            questions:[],
            description:description
        })
        admin.createdQuizes.push(newQuiz._id)
        await admin.save()
        const quiz={
            name:newQuiz.name,
            description:newQuiz.description,
            image:newQuiz.image,
            id:newQuiz._id
        }
        return res.status(201).json({
            ok:true,
            data:quiz
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
        const newQuizes=quizes.map(({_id,name,image,description})=>({
            id:_id,
            name:name,
            image:image,
            description:description
        }))
        return res.status(200).json({
            ok:true,
            data:newQuizes
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
        const newQuiz={
            name:quiz.name,
            id:quiz._id,
            description:quiz.description,
            questions:quiz.questions,
            image:quiz.image
        }
        return res.status(200).json({
            ok:true,
            message:"Have the quiz",
            data:newQuiz
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            message:"Error loading the quiz"
        })
    }
}

module.exports.getUserQuizes=async(req,res)=>{
    const {id}=req.params;
    try{
        const admin=await admindb.findOne({adminUser:id});
        const quizes=await admin.execPopulate('createdQuizes')
        const newQuizes=quizes.createdQuizes.map(({_id,name,image,description,questions})=>({
            id:_id,
            name:name,
            image:image,
            description:description,
            questions:questions
        }))
        return res.status(200).json({
            ok:true,
            data:newQuizes
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            message:"Error loading user quizes"
        })
    }
}