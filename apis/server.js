import express from 'express'
import 'dotenv/config'
import { dbConnect } from './config/db/db.js';
import userRouter from './roter/user/registor.router.js';
import bodyParser from 'body-parser';
import productRouter from './roter/product/product.roter.js';
import { productMulter } from './controller/product/product.controller.js';

const app=express()
const port=process.env.PORT;
//! middleware
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(bodyParser.json())
//! app lisen
app.use("/api/v1/user",userRouter) 
app.use("/api/v1/product",productRouter) 
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
    dbConnect()
})

