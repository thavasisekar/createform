const mongoose=require('mongoose')
async function getdb(){
    await mongoose.connect('mongodb://127.0.0.1:27017/users')
    .then(()=>console.log("running succussfully"))
    .catch("database error")
}

module.exports={getdb
}