
const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name:{ type:String , required: true },
    email:{ type:String , required: true ,unique:true},
    password:{ type:String , required: true } ,
    profilepic:{type:String ,default:''},
    about:{type:String ,default:''}
},{collection:'USER'},{timestamps:'true'})

const uuser = mongoose.model('Userdata',User)

module.exports = uuser