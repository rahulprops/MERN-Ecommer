import express from 'express'
import { login, registor } from '../../controller/user/registor.js'
const userRouter=express.Router()

//! create roter
userRouter.post("/registor",registor)   // => apis/v1/user/registor
userRouter.post("/login",login)        // => apis/v1/user/login
export default userRouter;