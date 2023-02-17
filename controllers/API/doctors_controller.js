//required package import
const jwt=require('jsonwebtoken');
const notifier = require("node-notifier");
//schema import
const doctor = require("../../models/doctors")

//controller t navigate to sign In page
module.exports.signIn=function(req,res){
    return res.render('signIn',{
        title:'Doctor Login'
    })
}

//controller to signUp page render
module.exports.signUp=function(req,res){
    return res.render('signUp',{
        title:'Doctor Sign Up Page'
    })
}

//creating doctor details in mongodb
module.exports.createDoctor=(req,res)=>{
    if(req.body.password!=req.body.cPassword)
    {
        return res.redirect("back");
    }
    doctor.findOne({email:req.body.email},function(err,newDoctor){
        if(err)
        {
            console.log("error in finding user during sign Up");
            return;
        }
        if(!newDoctor){
            doctor.create({email:req.body.email,password:req.body.password},(err,user)=>{
                if(err)
                {
                    console.log('error in creating user');
                    return;
                }
                 notifier.notify('Account created Successfull!!!');
                return res.redirect('/doctors');
            })
        }else{
            res.redirect('/doctors');
        }
    })
}
//creating sing In session checking details in mongodb
module.exports.createSession=async function(req,res){
    try{
        let dr=await doctor.findOne({email:req.body.email});

        if(!dr || dr.password!=req.body.password)
        {
            return res.json(422,{
                message:"Invalid username or Password"
            });
        }

        return res.status(200).render('admin',{
            message:"sign In successful, here is your token, please keep it safe",
            data:{token:jwt.sign(dr.toJSON(),'Hospital',{expiresIn:'10000'})}
        })
    }   catch(err){
        console.log('********',err);
        return res.json(500,{
            message:"Internal server Error"
        })
    }
}