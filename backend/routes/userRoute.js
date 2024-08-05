import express from 'express'
import { Login, logout, register } from '../controller/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const userRouter = express.Router()

// for making request to register
userRouter.post('/user/register' , register)


// for making request to log in 
userRouter.post('/user/login', Login)

// for making request to logout
userRouter.get(`/user/logout`, authMiddleware, logout)


export default userRouter