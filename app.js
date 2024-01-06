const express=require('express');
const app=express();
const morgan =require('morgan');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config()
const productroutes=require('./api/routes/products');
const ordersroutes=require('./api/routes/Orders');

mongoose.connect(
    process.env.MONGODBURL
  );
  
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use('/uploads',express.static('uploads'));
app.use('/products',productroutes);
app.use('/orders',ordersroutes);
    
app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status||502);
    res.json({
        error:{
            message:error.message
        }})
})
module.exports=app;