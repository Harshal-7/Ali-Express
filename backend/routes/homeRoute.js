import express from 'express'
import { getMoreToLove } from '../controller/homePageController.js'


const homeRouter = express.Router()

// request to add in the cart
homeRouter.get('/home/moretolove', getMoreToLove)



export default homeRouter