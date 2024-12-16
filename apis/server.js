import express from 'express'
import 'dotenv/config'
import { dbConnect } from './config/db/db.js';
const app=express()
const port=process.env.PORT;
 console.log("hello")
//! app lisen
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
    dbConnect()
})

