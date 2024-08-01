import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addToCart, getCartData } from '../controller/cartController.js'

const cartRouter = express.Router()

// request to add in the cart
cartRouter.post('/cart/add', authMiddleware, addToCart)

// request to get the cart data
cartRouter.get(`/cart/data`, authMiddleware, getCartData)


export default cartRouter