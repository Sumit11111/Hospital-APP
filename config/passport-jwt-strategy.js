//required packages import
const passport=require('passport');
const doctor = require('../models/doctors');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

//Jwt secret setup
let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrkey:`${process.env.secret}`
}

//passport setup using JWT
passport.use(new JWTStrategy(opts,(jwtPayLoad,done)=>{
    doctor.findById(jwtPayLoad._id,(err,dr)=>{
        if(err)
        {
            console.log("Error in finding doctor from JWT");
            return;
        }
        if(dr)
        {
            return done(null,dr);
        }
        else
        {
            return done(null,false);
        }
    })
}))

module.exports=passport;