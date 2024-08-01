import dotenv from 'dotenv'
import app from '../backend/app.js'
import { connectDb } from './config/db.js'

connectDb()

dotenv.config()
const PORT = process.env.PORT


app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})


