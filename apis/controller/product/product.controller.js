import multer from 'multer'
import path from 'path'
import { handleError } from '../../middleware/error/HandleError.js'
import { runInNewContext } from 'vm'
import productModal from '../../modal/product.modal.js'
import mongoose from 'mongoose'

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
//! add product
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
//! get all products
export const allProduct= async (req,res)=>{
    try{
        const getProduct= await productModal.find()
        if(getProduct){
            return handleError(res,200,true ,"find product sucessful",getProduct)
        }else{
            return handleError(res,400,false,"find product failed")
        }
    }catch(err){
        return handleError(res,500,false,`server error ${err}`)
    }
}
//! find by id
export const findByIdProduct= async (req,res)=>{
    const {id}=req.params;
    if(!id){
        return handleError(res,400,false,"id not found")
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return handleError(res,400,"please enter valid id")
    }
    try{
        const findById=await productModal.findById(id)
        if(findById){
            return handleError(res,200,true,"find product sucessful",findById)
        }else{
            return handleError(res,400,false,"find product failed")
        }
    }catch(err){
        return handleError(res,500,false,`server error ${err}`)
    }
}
//! update product by id
export const updateProdut= async (req,res)=>{
    const {id}=req.params;
    if(!id){
        return handleError(res,400,false,"please enter id")
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return handleError(res,400,false,"pleaser enter valid id")
    }
     if(!req.body){
        return handleError(res,400,false,"please select update feilds")
     }
    try{
       const updateProduct = await productModal.findByIdAndUpdate(id,req.body,{new:true})
       if(updateProduct){
        return handleError(res,200,true,"update product sucessful",updateProduct)
       }else{
        return handleError(res,400,false,"update product failed")
       }
    }catch(err){
        return handleError(res,500,false,`server error ${err}`)
    }
}
//! delete product by id
export const deleteProduct= async (req,res)=>{
    const {id}=req.params;
    if(!id){
        return handleError(res,400,false,"please enter id")
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return handleError(res,400,false,"please enter valid id")
    }
    try{
        const deleteProductById= await productModal.findByIdAndDelete(id)
        if(deleteProductById){
            return handleError(res,200,true,"delete product sucessful")
        }else{
            return handleError(res,400,false,"delete product failed")
        }
    }catch(err){
        return handleError(res,500,false,`server error ${err}`)
    }
}
