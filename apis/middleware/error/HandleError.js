export const handleError=( res,status,boolean,message,data,token)=>{
    res.status(status).json({
        suecess:boolean,
        message:message,
        data:data,
        token:token
    })
}