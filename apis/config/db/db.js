import mongoose from "mongoose";

export const dbConnect= async ()=>{
    try{
        const db=await mongoose.connect(process.env.DB_CONNECT)
        if(db){
            console.log('database connect sucessful')
        }else{
            console.log("database connect failed")
        }
    }catch(err){
        console.log(`databse failed ${err}`)
    }
}
