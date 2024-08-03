import asyncHandler from 'express-async-handler'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()


const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY
const HOST = process.env.HOST 


export const getAllCategory = asyncHandler(async (req, res) => {
    const response = await axios.get(`${BASE_URL}/category_list_1`, {
        headers: {
            "x-rapidapi-key" : API_KEY,
            "x-rapidapi-host" : HOST
        }
    }
)
console.log(`this localhost is working at ${process.env.PORT}`)
res.json(response.data)
})



export const getSubCategoryProductList = asyncHandler(async (req, res) => {
    const subcategorylist = req.params.subcategorylist
    const page = req.query.page || 1

    try {
        const response = await axios.get(`${BASE_URL}/item_search`, {
            params: {
                q: subcategorylist,
                page: page
            },
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": HOST
            }
        })

        res.json(response.data)
    } catch (error) {
        console.error(error)

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).json({
                message: error.response.data.message || 'An error occurred while fetching data from AliExpress.',
                status: error.response.status,
                data: error.response.data
            })
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).json({
                message: 'No response received from AliExpress. Please try again later.'
            })
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).json({
                message: 'An error occurred while setting up the request. Please try again later.'
            })
        }
    }
})



export const getProductDetailsById = asyncHandler(async (req, res) => {
    const producId = req.params.id
    console.log(producId)

    try {
        const response = await axios.get(`${BASE_URL}/item_detail`, {
            params: {
                itemId: producId
            },
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": HOST
            }
        })
        console.log('inside try block')
        res.json(response.data.result)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
})