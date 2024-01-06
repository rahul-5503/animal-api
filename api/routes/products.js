const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Product=require('../models/product');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'./uploads/');
    },
    filename:function(req, file, cb){
        cb(null, file.originalname);
    }
})

const fileFilter =(req ,file ,cb)=>{
    const filetype=file.originalname.split(".").pop();
    if(filetype === 'jpeg' || filetype === 'png' || filetype === 'jpg'||'JPG' )
      cb(null,true);
    else
     cb(null,false);
}

const upload=multer({
    storage:storage, 
    limits:{
    fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

router.post('/',upload.single('productImage'),(req,res,next)=>{
    console.log(req.file);
   
    const product=new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        productimage:req.file.filename,
        type:req.body.type,
        about:req.body.about
    })
    product.save()
    .then(result=>{const output={
        count:result.length,
        products:{
                id: result._id,
                name:result.name,
               type:result.type,
                productimage:result.productimage,
                about:result.about,
                request:{
                    type:'GET',
                    imageurl:'http://localhost:3000/uploads/'+ result.productimage,
                     url:'http://localhost:3000/products/'+ result._id
                       }}
       
    }
    res.status(200).json({output});
    }).catch(err=> 
        {  console.log(err);
                res.status(500).json({
                    message:"incorrect input"
                });
        })
})

router.get('/',(req,res,next)=>{
    Product.find()
    .select('name _id productimage about type')
    .exec()
    .then(result=>{
        const output={
            count:result.length,
            products:result.map(doc=>{
                return{
                    id: doc._id,
                    name: doc.name,
                    productimage:doc.productimage,
                    Vertebrates:doc.type,
                    about:doc.about,
                    request:{
                        type:'GET',
                        imageurl:'http://localhost:3000/uploads/'+doc.filename,
                         url:'http://localhost:3000/products/'+ doc._id
                           }  }
           }),
        }
        res.status(200).json({output})
    })
    .catch(err=>{
        res.status(500).json({message:"can't find"})
    });
});

router.get('/:productid',(req,res,next)=>{
    const id = req.params.productid;
    Product.findById(id)
    .select('name type productImage about')
    .exec()
    .then(doc =>{
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(500).json({message:"No valid entry found for the give"});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    })
   
});

router.patch('/:productid',(req,res, next)=>{
    res.status(200).json({
        message:`updated product ${req.params.productid}`,
    })
});

router.delete('/:productid',(req,res, next)=>{
    const id =req.params.productid;
    Product.deleteOne({ _id:id })
    .exec()
    .then(result=>{
        if(result.deletedCount==0){
            res.status(404).json({ message:"not found "})
        }else{
            res.status(200).json({result})   
        }      
    }).catch(err=>{
        console.log(err),
        res.status(500).json({
        error:err,
    })
    })
});


module.exports=router;