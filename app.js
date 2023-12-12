const express=require('express')
const app=express()
const {engine}=require('express-handlebars')
const bodyparser=require('body-parser')
const path=require('path')
const {getdb}=require('./connectdb/db')
const {hashgenerate}=require('./hash/hashing')
const {hashvalidator}=require('./hash/hashing')
const {usermodel}=require('./modelschema/model')
getdb();
app.engine('hbs',engine({extname:'.hbs',defaultLayout:'main',runtimeOptions:{
    allowProtoPropertiesByDefault:true,
    allowProtoMethodsByDefault:true
}}))
app.set('view engine',"hbs")
app.use(bodyparser.urlencoded({extended:true}))

app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.get('/',async(req,res)=>{

    let finduser=await usermodel.find({})
    let edit_id,edit_name,edit_delete;
    console.log("this is finduser",finduser);
    if(req.query.edit_id){
      edit_id=req.query.edit_id;
      edit_name=await usermodel.findOne({_id:edit_id})
   console.log("this is edit naem",edit_name,edit_id);
    }
   if(req.query.delete_id){
     delete_id=req.query.delete_id;
     edit_dalete=await usermodel.findByIdAndDelete({_id:delete_id})
     return res.redirect('/?status=3')
   }

    let message;
    switch (req.query.status) {
        case "1":
            message="Create successfully"
            break;
            case '2':
                console.log("update");
                message="update successfully!"
                break;
                case '3':
                    console.log("delete");
                    message="delete successfully!"
                    break;
        default:
            break;
    }
   await res.render('index',{message,finduser,edit_id,edit_name,edit_delete,})
})
app.post('/create',async(req,res)=>{
    try {
        const hashpassword=await hashgenerate(req.body.password)
        const saveduser=new  usermodel({username:req.body.username,email:req.body.email,password:hashpassword})
        await saveduser.save()
        res.redirect('/?status=1')
        console.log(saveduser);
    } catch (error) {
        
    } 
    
})

//login user 
app.get('/login',async(req,res)=>{
    let loginstatus;
    switch (req.query.status) {
        case "1":
            loginstatus="login successfully"
            break;
    case "2":
        loginstatus="something is error"
            break;
        default:
            break;
    }
      await  res.render('login',{loginstatus})
})
app.post('/login',async(req,res)=>{
  try {

    const getuser=await usermodel.findOne({username:req.body.username})
    console.log("getuser",getuser);
    if(!getuser){
        res.send("username is not found")
    }
    else{
        console.log("hello");
       const checkpassword=await hashvalidator(req.body.password,getuser.password)
       if(checkpassword){
           console.log("Fs",checkpassword);
           console.log("is true");
               res.redirect('/login?status=1')

       }
       else{
        console.log("is false");
               res.redirect('/login?status=2')
       }
    }
  } catch (error) {
    res.send(error)
  }
})

app.post('/updateuser/:edit_id',async(req,res)=>{
    let edit_id=req.params.edit_id;
    const hashpassword=await hashgenerate(req.body.password)
    let updater=await usermodel.findByIdAndUpdate({_id:edit_id},{username:req.body.username,password:hashpassword})
    return res.redirect('/?status=2')
})
app.get('*',(req,res)=>{
    res.render("404")
})




















app.listen(5000,()=>{
    console.log("server is listening");
})