import { handleError } from "../../middleware/error/HandleError.js";
import userModal from "../../modal/user.modal.js";
import validator from "validator";
import bcrypt from "bcrypt";
//! user registor 
export const registor = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  if (userName && userEmail && userPassword) {
    // email check email valid or not
    if (!validator.isEmail(userEmail)) {
      return handleError(res, 400, false, "please enter valid email");
    }
    try {
      // check user exist or not
      const isValidUser = await userModal
        .findOne({ userEmail: userEmail })
        .select("-userPassword");
      if (isValidUser) {
        return handleError(res, 400, false, "user already exist");
      }
      // password hash
      const hashPassword = await bcrypt.hash(userPassword, 12);
      // create user
      const createUser = new userModal({
        userName: userName,
        userEmail: userEmail,
        userPassword: hashPassword,
      });
      if (createUser) {
        const registor = await createUser.save();
        return handleError(res, 201, true, "registor user sucessful", registor);
      } else {
        return handleError(res, 400, false, "registor user failed");
      }
    } catch (err) {
      return handleError(res, 500, false, `server error:${err}`);
    }
  } else {
    return handleError(res, 400, false, "all feils requied");
  }
};
 
// ! login user
export const login= async (req,res)=>{
    const {userEmail,userPassword}=req.body;
      if(! userEmail || ! userPassword){
        return handleError(res,400,false ,"all feilds requied")
      }
      if(!validator.isEmail(userEmail)){
        return handleError(res,400,false,"enter valid email")
      }
    try{
          const findUser=await userModal.findOne({userEmail:userEmail})
          if(!findUser){
            return handleError(res,400,false,"user not registor")
          }
          const comparePass= await bcrypt.compare(userPassword,findUser.userPassword) 
          if(comparePass){
            return handleError(res,200,true,"login sucessul")
          }else{
            return handleError(res,400,false,"Invalid password")
          }
    }catch(err){
        return handleError(res,500,false,`server error:${err}`)
    }
}