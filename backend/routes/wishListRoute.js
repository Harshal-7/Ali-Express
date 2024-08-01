import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addToWishlist, getWishListData } from '../controller/wishListController.js'

const wishlistRouter = express.Router()

// request to add in the cart
wishlistRouter.post('/wishlist/add', authMiddleware, addToWishlist)

// request to get the cart data
wishlistRouter.get(`/wishlist/data`, authMiddleware, getWishListData)


export default wishlistRouter