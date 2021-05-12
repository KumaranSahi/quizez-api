const express=require('express')
const router=express.Router();
const passport=require('passport')

//middlewares

const userCheck=require('../Middleware/userCheck');
const quizCheck=require('../Middleware/quizCheck')

//controller

const userController=require('../Controller/User.controller')
const quizController=require('../Controller/Quiz.controller')
const questionController=require('../Controller/Questions.controller')

//User routes

router.post('/users/signin',userController.signinUser)
router.post('/users/signup',userController.signupUser)
router.post('/users/password',userController.changePassword)

//quiz routes

router.post('/quizes/:id/create',passport.authenticate('jwt',{session:false}),userCheck,quizController.createQuiz)
router.get('/quizes',passport.authenticate('jwt',{session:false}),quizController.getAllQuizes)
router.get("/quizes/:quizId",passport.authenticate('jwt',{session:false}),quizCheck,quizController.getQuiz)

//question routes

router.post('/questions',passport.authenticate('jwt',{session:false}),questionController.createQuestion)
router.delete('/questions/:questionId',passport.authenticate('jwt',{session:false}),questionController.deleteQuestion)

module.exports=router;