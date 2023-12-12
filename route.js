const express=require('express')
const authroute=express.Router();


authroute.get('/',(req,res)=>{
    res.render('main')
})
authroute.get('/createuser',(req,res)=>{
    res.render('main')
})


module.exports=authroute