
const express=require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const multer =require('multer')
const path = require('path')

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/loginandsignup')

const app=express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json());
app.use('/images', express.static(path.join(__dirname,'/images')));

const authRoute =require('../server/routes/auth');
const postRoute = require('../server/routes/Post');
const userRoute = require('../server/routes/Userrr')
const fileUpload = require('express-fileupload');

app.get('/',function(req,res){
    res.send('Hello there')
})


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})


const upload = multer({storage:storage});

app.post('/server/upload',upload.single("file"),(req,res)=>{
    
 res.json("file has been uploaded")
})

app.use(fileUpload());
app.use('/server/auth',authRoute);
app.use('/server/newpost',postRoute);
app.use('/server/user',userRoute)



app.listen(8008)



