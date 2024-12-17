import mongoose, { Schema } from "mongoose";

const productSchema=new Schema({
    productTitel:{
        type:String,
        required:[true,"title is required"]
    },
    productDescription:{
        type:String,
        required:[true,"description is required"]
    },
    productImage:{
        
        type:String,
        required:[true,"image is requied"]
    },
    productPrice:{
        type:Number,
        required:[true,"price is requied"]
    },
    productCategory:{
        type:String,
        required:[true,"categroy is required"]
    },
    prodductQty:{
        type:String,
        required:[true,"qty is requied"]
    }

},{timestamps:true})
const productModal= mongoose.model("product",productSchema)
export default productModal