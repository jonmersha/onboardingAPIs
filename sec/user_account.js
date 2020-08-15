const dbopp=require('../db/./db_operation')

const users=(req,res)=>{
    //performs Users Account Creations Activity 
    dbopp.userActivity.newUser(req,res)
    //res.send(req.body)
}
const user_activation=(req,res)=>{
    //performs Users account Autorizations 

}
const login=(req,res)=>{
    //performs Users account Autorizations 
}
exports.user_task={create:users,authorizer:user_activation,logins:login}