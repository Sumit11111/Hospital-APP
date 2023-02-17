const express=require('express');
const app=express();

// database connection and schema setup
const db=require('./config/mongoose');
const doctor=require('./models/doctors');
const patient=require('./models/patients');

//ejs template setup
app.set('view engine','ejs');
app.set('views','./views');

//url parser setup
app.use(express.urlencoded({extended:false}));

//route setup
app.use('/',require('./routes/API/index'));

app.listen(8000,(err)=>{
    if(err)
    {
        console.log("Error in listening",err);
        return;
    }
    return console.log("Server is listening at 8000");
})