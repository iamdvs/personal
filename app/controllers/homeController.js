const controller=require('./controller');
const Profile=require('app/model/profile');

class homeController extends controller{

    async index(req,res){
        var profile=await Profile.find({});
        console.log(profile)
        res.render('index',{profile})
    }
}

module.exports=new homeController();