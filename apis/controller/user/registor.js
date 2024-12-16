import { handleError } from "../../middleware/error/HandleError.js";
import userModal from "../../modal/user.modal.js";

export const registor= async (req,res)=>{
    const {userName,userEmail,userPassword}=req.body;
     if(userName && userEmail && userPassword){
        try{
            const isValidUser= await userModal.findOne({userEmail:userEmail}).select("-userPassword")
            if(isValidUser){
                return handleError(res,400,false,"user already exist")
            }
             const createUser= new userModal({
                userName:userName,
                userEmail:userEmail,
                userPassword:userPassword
             })
             if(createUser){
                const registor=await createUser.save()
                 return handleError(res,201,true,"registor user sucessful",registor)
             }else{
                return handleError(res,400,false,"registor user failed")
             }
        }catch(err){
            return handleError(res,500,false,`server error:${err}`)
        }
     }else{
        return handleError(res,400,false,"all feils requied")
     }
    
}