const express=require('express');
const router=express.Router();


const homeRouter=require('./home');
const adminRouter=require('./admin')
router.use('/',homeRouter);

router.use('/admin',adminRouter);




module.exports=router;