import express from 'express'
import 'dotenv/config'
const app=express()
const port=process.env.PORT;
 console.log("hello")
//! app lisen
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

