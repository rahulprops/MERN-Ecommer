import express from 'express'
import { allProduct, findByIdProduct, productAdd, productMulter } from '../../controller/product/product.controller.js'
const productRouter=express.Router()

productRouter.post("/add",productMulter.single("image"),productAdd) // => api/v1/product/add
productRouter.get("/all",allProduct)                                // => api/v1/product/all
productRouter.get("/:id",findByIdProduct)                           //=> api/v1/product/id

export default productRouter; 