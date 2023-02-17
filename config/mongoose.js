//imprting mongoose
const mongoose=require('mongoose');
//connectin setup
mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@cluster0.eoh5n.mongodb.net/Hospital?authMechanism=DEFAULT`);
const db=mongoose.connection;
//opening db connection
db.on('error',console.error.bind(console,"Error connecting to MongoDB"));
db.once('open',function(){
    console.log('Connected to Database::MongoDB');
});

module.exports=db;
