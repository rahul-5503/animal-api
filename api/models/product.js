const mongoose=require('mongoose');

const productschema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    type:{type:String,required:true},
    productimage:{type:String,required:true},
    about:{type:String,required:true}
})

module.exports=mongoose.model('Product',productschema);