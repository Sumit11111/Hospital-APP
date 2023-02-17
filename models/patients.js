const mongoose=require('mongoose');
const patientSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    CreatedByDr:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    }

})

const patient=mongoose.model('patient',patientSchema);
module.exports=patient;