const mongoose = require('mongoose');


const UserPost = new mongoose.Schema({
    title:{ type:String , required: true },
    content:{ type:String , required: true },
    category:{ type:String , required: false },
    username:{ type:String },
    postpic:{ type:String },
    userid:{type:String}
},{timestamps:true},{collection:'POSTS'})

const post =mongoose.model('Userpost',UserPost)

module.exports = post