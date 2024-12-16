import mongoose, { Schema } from "mongoose";

//! user schema
const  userSchema=new Schema({
    userName:{
        type:String,
        required:[true,"username is required"]
    },
    userEmail:{
        type:String,
        required:[true,"userEmial is required"],
        unique:true,
    },
    userPassword:String
},{timestamps:true})
//! usermodal
const userModal= mongoose.model("user",userSchema)
export default userModal;