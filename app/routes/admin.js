const express=require('express');
const router=express.Router();


const adminController=require('app/controllers/admin/adminController');

router.get('/',adminController.index)
router.post('/',adminController.setProfile)



module.exports=router;