import express from 'express'
import { Login, register } from '../controller/userController.js'


const userRouter = express.Router()

// for making request to register
userRouter.post('/user/register' , register)


// for making request to log in 
userRouter.post('/user/login', Login)


export default userRouter