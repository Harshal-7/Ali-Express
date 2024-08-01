import express from 'express'
import { getAllCategory, getSubCategoryProductList, getProductDetailsById } from '../controller/categoryController.js'

const categoryRouter = express.Router()

categoryRouter.get('/category' , getAllCategory)

// for subcategory list like user clicks on shoes to display all the shoes
// use same url to fetch the data from search bar
categoryRouter.get('/category/:subcategorylist' , getSubCategoryProductList)

// route for itemdescription
categoryRouter.get('/product/:id' , getProductDetailsById)

export default categoryRouter