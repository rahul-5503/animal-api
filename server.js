const http = require('http');
const app = require('./app');

const mongoose=require('mongoose');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000;

const server = http.createServer(app);


mongoose.set('strictQuery',false);
const connectDB = async ()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGODBURL);
        console.log(`MongoDB Connection: ${conn.connection.host}`);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
mongoose.connect(
    process.env.MONGODBURL
  );
  
  connectDB().then(()=>{
app.listen(3000,()=>{
  console.log(`Server running on port ${port}`)})
})