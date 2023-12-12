const bcrypt=require('bcrypt')
const saltr=10;


const hashgenerate=async(plainpassword)=>{
    const salt=await bcrypt.genSalt(saltr)
    const hasher=await bcrypt.hash(plainpassword,salt);
    return hasher;
}

const hashvalidator=async(plainpassword,hashpassword)=>{
    const result=await bcrypt.compare(plainpassword,hashpassword)
    return result;
}
module.exports.hashgenerate=hashgenerate;
module.exports.hashvalidator=hashvalidator;