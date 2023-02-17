const mongoose=require('mongoose');
const doctorSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const doctor=mongoose.model('doctor',doctorSchema);
module.exports=doctor;