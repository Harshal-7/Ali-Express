import express from 'express'
import cors from 'cors'
import categoryRouter from './routes/categoryRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import cookieParser from "cookie-parser";
import wishlistRouter from './routes/wishListRoute.js';


const app = express()

// Middleware setup
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded requests
app.use(cookieParser()); // Parse cookies from incoming requests


// route management
// for categories
app.use('/api', categoryRouter )

// for user related requests
app.use('/api', userRouter)

// for cart related requests
app.use(`/api`, cartRouter)

// for wishlist related requests
app.use(`/api`, wishlistRouter)



export default app