import multer from 'multer'
import path from 'path'

//! path 
const path= path.join("public/product")
//! image upload using multer

const store= multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null , path)
    },
    filename:(req,file,cb)=>{
        return cb(null,file.originalname)
    }
})
export const productMulter= multer({storage:store})


