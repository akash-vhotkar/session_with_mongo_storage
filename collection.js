const Mongoose  = require('mongoose');
const schema  = new  Mongoose.Schema({
    email:{
        type :String
    }
})


const userModel  = Mongoose.model('sessions', schema);
module.export  = userModel;
