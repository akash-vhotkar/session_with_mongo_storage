const  mongoose  = require('mongoose');

const connectDb = ()=>{
    const connectionString  = "mongodb://localhost:27017/users";
    mongoose.connect(connectionString , { useNewUrlParser: true,
    useUnifiedTopology: true } ,(err)=>{
        if(err){
            console.log("Mongoose connection failed  ", err);
            return;
        }
        console.log("Mongoose connection  successfully");
    })
}
module.exports.connectDb  = connectDb ;
