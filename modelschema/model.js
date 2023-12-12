const mongoose=require('mongoose')
const modelschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        created_at:Date,
        updated_At:Date
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const usermodel=mongoose.model("store",modelschema)
module.exports={usermodel}