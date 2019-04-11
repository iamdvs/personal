const mongoose=require('mongoose');


var ProfileSchema=mongoose.Schema({
    name:String,
    Expertise:String,
    profile:String,
    email:String,
    phone:String,
    description:String
})

var profile=mongoose.model('profile',ProfileSchema);



module.exports=profile;