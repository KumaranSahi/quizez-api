const scoreboardsdb=require('../Models/scoreboard.model')
const usersdb=require('../Models/users.model');

module.exports.QuizDone=async (req,res)=>{
    const {id}=req.params;
    const {score,quizid}=req.body;
    try{
        const scorecard=await scoreboardsdb.create({
            user:id,
            quiz:quizid,
            score:score
        })
        const user=await usersdb.findById(id);
        user.scores.push(scorecard._id);
        await user.save();
        return res.status(200).json({
            ok:true,
            message:"score added"
        })

    }catch(error){
        console.log(error)
        return res.status(503).json({
            message:"Error saving user score"
        })
    }


}