const mongoose  = require('mongoose');

const userSchema  = new mongoose.Schema({
    email :  {
        type :String
    },
    firstName : {
        type :String 
    }
}, {timestamps : true});



const UserModel  = mongoose.model("users",  userSchema);

module.exports  =UserModel;


