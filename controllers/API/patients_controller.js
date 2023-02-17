const patient = require("../../models/patients")
const notifier = require("node-notifier");
const {Parser}=require('json2csv');

//creating patients details in db phone number will be unique
module.exports.register=function(req,res){
    //console.log("sadadasdsadasdas:",req.body);
    patient.findOne({Phone:req.body.Phone},(err,pt)=>{
        if(err)
        {
            console.log("error in getting patient");
            return;
        }
        if(!pt){
            patient.create(req.body,(err,newPatient)=>{
                if(err)
                {
                    console.log('Error in Registering Patient');
                    return;
                }
                notifier.notify('Successfully Patient registered');
                return res.render('success',{title:"success"});
            })
            
        }else{
            notifier.notify("patient report already exist if you want to update details please click on update details");
            const json2csv=new Parser({pt});
            const csv=json2csv.parse(pt);
            res.header('content-type','text/csv');
            return res.send(csv);
        }
        
    })
}

//updating Patients detail based on phone number
module.exports.updatePatient=(req,res)=>{
    return res.render('updatePatient',
    {
        title:'update patient Details'
    })
}

//fetching all patients detials and creating csv file
module.exports.allPatientsDetails=(req,res)=>{
    patient.find({},(err,pt)=>{
        if(err)
        {
            console.log("error in fetching all patients");
            return;
        }
        const json2csv=new Parser({pt});
        const csv=json2csv.parse(pt);
        res.header('content-type','text/csv');
        return res.send(csv);
    })
}

module.exports.allPatientsReportBasedOnStatus=(req,res)=>{
    return res.render('patientStatus');
}

//downloading patients details based on patient status
module.exports.reportBasedOnStatus=(req,res)=>{
    console.log(req.body);
    try{
        patient.find({Status:req.body.Status},(err,pt)=>{
            //console.log("pt:",pt.length);
            if(err)
            {
                console.log("error in fetching report based on status");
                return;
            }
            if(pt.length==0)
            {
                return res.status(200).json({
                    message:"No data for this status"
                })
            }
            const json2csv=new Parser({pt});
            const csv=json2csv.parse(pt);
            res.header('content-type','text/csv');
            return res.status(200).send(csv);
        })
    }catch(err){
        if(err)
        {
            console.log("empty data field",err);
            return ;
        }
    }
    
}
//updating patients details
module.exports.createReport=(req,res)=>{
    console.log("updating patient",req.body);
 patient.updateOne({Phone:req.body.Phone},{
    $set:{
        Name:req.body.Name,
        Phone:req.body.Phone,
        CreatedByDr:req.body.CreatedByDr,
        Status:req.body.Status,
        Date:req.body.Date
}},(err)=>{
    if(err)
    {
        console.log("error in updating doc in db");
        return;
    }
    return res.status(200).json({message:"Report created successful",data:req.body});   
});
 
}