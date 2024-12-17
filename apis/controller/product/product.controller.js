import multer from 'multer'
import path from 'path'
import { handleError } from '../../middleware/error/HandleError.js'
import { runInNewContext } from 'vm'
import productModal from '../../modal/product.modal.js'

//! path 
const Path= path.join("public/product")
//! image upload using multer

const store= multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null , Path)
    },
    filename:(req,file,cb)=>{
        return cb(null,file.originalname)
    }
})
export const productMulter= multer({storage:store})

export const productAdd= async (req,res)=>{
    const {productTitle,productDesc,productPrice,productCategory,productqty}=req.body;
    const image=req.file;

    if(!productTitle || !productDesc || !productPrice || !productCategory || !productqty){
        return handleError(res,400,false,"all feilds requied")
    }
    if(!image){
        return handleError(res,400,false,"please select image")
    }
    try{
        
      const uploadProduct= new productModal({
        productTitle:productTitle,
        productDescription:productDesc,
        productImage:image.filename,
        productPrice:productPrice,
        productCategory:productCategory,
        prodductQty:productqty
      })
      if(uploadProduct){
        const add= await uploadProduct.save()
        if(add){
            return handleError(res,201,true,"upload sucessful",uploadProduct)
        }
      }else{
        return handleError(res,400,false,"product upload failed")
      }
    }catch(err){
        return handleError(res,500,false,`server error ${err}`)
    }
}
