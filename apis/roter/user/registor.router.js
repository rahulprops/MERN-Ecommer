import express from 'express'
import { registor } from '../../controller/user/registor.js'
const userRouter=express.Router()

//! create roter
userRouter.post("/registor",registor)   //=>
export default userRouter;