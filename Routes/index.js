const express=require('express')
const router=express.Router();
const passport=require('passport')

//middlewares

const userCheck=require('../Middleware/userCheck');
const quizCheck=require('../Middleware/quizCheck');
const questionCheck=require('../Middleware/questionCheck')

//controller

const userController=require('../Controller/User.controller')
const quizController=require('../Controller/Quiz.controller')
const questionController=require('../Controller/Questions.controller')
const scoreboardController=require('../Controller/Scoreboard.controller')

//User routes

router.post('/users/signin',userController.signinUser)
router.post('/users/signup',userController.signupUser)
router.post('/users/password',userController.changePassword)

//quiz routes

router.post('/quizes/:id/create',passport.authenticate('jwt',{session:false}),userCheck,quizController.createQuiz)
router.get('/quizes',passport.authenticate('jwt',{session:false}),quizController.getAllQuizes)
router.get("/quizes/:quizId",passport.authenticate('jwt',{session:false}),quizCheck,quizController.getQuiz)
router.get("/quizes/:id/user",passport.authenticate('jwt',{session:false}),userCheck,quizController.getUserQuizes)

//question routes

router.post('/questions/:id',passport.authenticate('jwt',{session:false}),userCheck,questionController.createQuestion)
router.post('/questions/:questionId/edit',passport.authenticate('jwt',{session:false}),questionCheck,questionController.editQuestion)
router.delete('/questions/:questionId',passport.authenticate('jwt',{session:false}),questionController.deleteQuestion)

//scorecard routes

router.get("/scorecards",passport.authenticate('jwt',{session:false}),scoreboardController.getTopTen)
router.post("/scorecards/:id",passport.authenticate('jwt',{session:false}),userCheck,scoreboardController.QuizDone)
router.get("/scorecards/:id",passport.authenticate('jwt',{session:false}),userCheck,scoreboardController.getUserTopTen)

module.exports=router;