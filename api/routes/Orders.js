const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'orders'
    });
});


router.post('/',(req,res,next)=>{
    const prod={
        productid:req.body.proid,
        price:req.body.price
    }
    res.status(200).json({
        message:'in product',
        data:prod
    });
})

router.get('/:orderid',(req,res,next)=>{
    const id=req.params.orderid
    res.status(201).json({
        message:'orders post',
        Id:id
    });
});

router.patch('/:orderid',(req,res,next)=>{
    const id=req.params.orderid
    res.status(201).json({
        message:'orders patch',
        Id:id
    });
});

module.exports=router;