// const express = ;
const router = require('express').Router();
const User = require('../../server/models/user');
const bcrypt =require('bcrypt')


// const Userdata =require('../models/user')



router.post('/signup',async function(req,res){
  
  try {

    const salt =await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password, salt)
      
   const nu= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:hashedPassword, 
  })
  res.json({status:'ok',error:'no error',user:nu})
  console.log('heyyii')
} catch (err){
  res.json({status:'error',error:'invalid or existing email'})
  console.log(err)
}

})


router.post('/login',async function(req,res){
  try{
     const user = await User.findOne({
      email:req.body.email
     })
     !user&& res.status(400).json("wrong info")

     const validate = await bcrypt.compare(req.body.password,user.password)
     !validate && res.status(400).json("wrong info")
     const { password, ...others } = user._doc;
     res.json({body:others})
  } catch(err){
      res.json(err)
  }

})
// router.post('/signup',async (req,res)=>{
   
//     try{
//            await Userdata.create({
//           name:req.body.name,
//           email:req.body.email,
//           password:req.body.password,
//        });
//     //    const user =await newUser.save();
//        res.status(200).json(user)
//     } catch (err){
//       console.log(err)
//     }
// })
router.get('/auth',(req , res) => {
  res.send('Hey bro')
})

module.exports = router