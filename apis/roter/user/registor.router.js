import express from 'express'
import { allUsers, login, registor } from '../../controller/user/registor.js'
const userRouter=express.Router()

//! create roter
userRouter.post("/registor",registor)   // => api/v1/user/registor
userRouter.post("/login",login)        // => api/v1/user/login
userRouter.get("/all",allUsers)       //=> api/v1/user/all
export default userRouter;