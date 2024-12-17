import express from 'express'
import { productAdd, productMulter } from '../../controller/product/product.controller.js'
const productRouter=express.Router()

productRouter.post("/add",productMulter.single("image"),productAdd) // => api/product/add
export default productRouter;