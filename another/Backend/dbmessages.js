
const mongoose=require('mongoose')
const schema=mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    roomTitle:String,
    received: Boolean
   
});
const newWhatsappModel=mongoose.model('whatsappcollections',schema);
module.exports=newWhatsappModel;
