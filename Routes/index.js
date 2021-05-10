const express=require('express')
const router=express.Router();
const passport=require('passport')

//middlewares

const userCheck=require('../Middleware/userCheck');

//controller

const userController=require('../Controller/User.controller')

//User routes

router.post('/users/signin',userController.signinUser)
router.post('/users/signup',userController.signupUser)
router.post('/users/password',userController.changePassword)

module.exports=router;