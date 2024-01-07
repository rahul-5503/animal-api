const express = require('express');
const app=express();
const morgan =require('morgan');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const productroutes=require('./api/routes/products');
const ordersroutes=require('./api/routes/Orders');
  


const port = process.env.PORT || 3000;

mongoose.set('strictQuery',false);
const connectDB = async ()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGODBURL);
        console.log(`MongoDB Connection: ${conn.connection.host}`);
    }
    catch(error){
        console.log('mongodb connection error:',error);
        process.exit(1);
    }
}

  connectDB().then(()=>{
app.listen(port,()=>{
  console.log(`Server running on port ${port}`)})
})

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