const express=require("express")
const app=express()
require("dotenv").config()
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Methods','GET,DELETE,POST, PUT');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.setHeader('Access-Control-Allow-Headers','*');
    next(); 
})
app.listen(process.env.PORT ||5000,()=>{
    console.log("you server is running...")})


const router=require("./Routes/routes")
const animeRouter=require("./Routes/animeRoutes")
const commentRouter=require("./Routes/commentRouter")
const fileUpload=require("express-fileupload")
const path=require('path')



app.use(express.json({limit:'100mb'}))
app.use(fileUpload({useTempFiles : true}))
app.use("/",router)
app.use("/",animeRouter)
app.use("/",commentRouter)
//set up for deployment
app.use(express.static(path.join(__dirname,'./','client','build')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./','client','build','index.html'))
})
const mongoose=require("mongoose") 
mongoose.connect(process.env.URL,()=>{console.log("your data base is connected")})