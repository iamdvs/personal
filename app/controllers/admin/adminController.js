const controller=require('app/controllers/controller');
const flash=require('connect-flash');
const Profile=require('app/model/profile');


class adminController extends controller{
    index(req,res){
        res.render('./admin/index',{errors:req.flash('errors')})
    }

    setProfile(req,res){

        this.validationData(req,res).then(result=>{
            if(!result){

                res.redirect('/admin')

            }else{
                var profile=new Profile({
                    name:req.body.name,
                    Expertise:req.body.Expertise,
                    profile:req.body.profile,
                    email:req.body.email,
                    phone:req.body.phone,
                    description:req.body.description
                })

                profile.save(function(err,profile){
                    if (err) throw err;
                    console.log(profile);
                })
                res.redirect('/')
            }
        })
    }
    validationData(req,res){
        req.checkBody('name','name invalid').notEmpty();
        req.checkBody('Expertise','is empty need to write something').notEmpty();
        req.checkBody('profile','profile invalid required 8 character').isLength({min:8});
        req.checkBody('email','invalid email address').isEmail();
        req.checkBody('phone','invalid phone number').isLength({min:11})
        // req.checkBody('image')
        req.checkBody('description','description invalid or not empty').notEmpty()



        return req.getValidationResult().then(result=>{
            const errors=result.array();
            const message=[]
            errors.forEach(err=> message.push(err.msg));
            if (message.length==0)
                return true
            req.flash('errors',message);
            return false;    
        }).catch(err=> console.log(err));

    }
}

module.exports=new adminController();