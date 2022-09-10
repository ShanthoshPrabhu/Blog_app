const router = require('express').Router();
const Userpost = require('../../server/models/post');
const multer = require('multer')

router.post('/',async (req,res) => {
   const newPost = new Userpost(req.body);
try {
  const savedPost = await newPost.save();
  res.status(200).json(savedPost);
} catch (err) {
  res.status(500).json(err);
}
})


router.put("/:id", async (req, res) => {
   try {
     const post = await Userpost.findById(req.params.id);
     if (post.username === req.body.username) {
       try {
         const updatedPost = await Userpost.findByIdAndUpdate(
           req.params.id,
           {
             $set: req.body,
           },
           { new: true }
         );
         res.status(200).json(updatedPost);
       } catch (err) {
         res.status(500).json(err);
       }
     } else {
       res.status(401).json("You can only update your post!");
     }
   } catch (err) {
     res.status(500).json(err);
   }
 });

 router.delete("/:id", async (req, res) => {
   try {
     const post = await Userpost.findById(req.params.id);
     if (post.username === req.body.username) {
       try {
         await post.delete();
         res.status(200).json("Post has been deleted...");
       } catch (err) {
         res.status(500).json(err);
       }
     } else {
       res.status(401).json("You can delete only your post!");
     }
   } catch (err) {
     res.status(500).json(err);
   }
 });

 router.get("/:id", async (req, res) => {
   try {
     const post = await Userpost.findById(req.params.id);
     res.status(200).json(post);
   } catch (err) {
     res.status(500).json(err);
   }
 });
 
 router.get("/", async (req, res) => {
   const username = req.query.user;
   const catName = req.query.cat;
   try {
     let posts;
     if (username) {
       posts = await Userpost.find({ username });
     } else if (catName) {
       posts = await Userpost.find({
         category:catName,
       });
     } else {
       posts = await Userpost.find();
     }
     res.status(200).json(posts);
   } catch (err) {
     res.status(500).json(err);
   }
 });
module.exports = router





// try{
                    // const newpost = await Userpost.create({
                    //     title:req.body.title,
                    //     content:req.body.content,
                    //     category:req.body.category,
                    //     postpic:req.files.file
                    // })
                    // console.log(newpost)
                    // res.json({status:'ok',file:newpost})
                    // }catch(err){
                    //     res.json({status:'error',error:'invalid or existing email'})
                    //     console.log(err)
                    // }