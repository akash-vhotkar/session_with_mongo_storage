const http  = require('http');
const express = require('express');
const app  = express();
const expres_session = require('express-session');
const cors  =require('cors');

const UserModel  = require('./schema');
const bodyParser = require('body-parser');
const cookieParser  =require('cookie-parser');
const { connectDb } = require('./db');
connectDb();
const mongoStore  = require('connect-mongodb-session')(expres_session);
const userModel  = require('./collection');

app.use(cookieParser());
app.use( bodyParser.json());
app.use(express.json());
app.use(expres_session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: 'mongodb://localhost:27017/users',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native',
        databaseName:'users'
,        collection: 'sessions'
    })
  }))
  
app.use(cors({
    origin : "*"
}))
app.get("/users", (req, res)=>{
    UserModel.find().then((data)=>{
        res.status(200).json({result :  data});
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);
    })
});
app.get('/me',(req, res)=>{
    console.log(req.sessionID);
console.log(req.sessionStore.all());
    res.send(req.session);
})

app.get('/web', (req, res)=>{
    req.session.name = "Akash vhotkar";
    req.session.lastname = "new last name ";
    req.session.save((err)=>{
        res.send("akash vhotkar");
        
    })
})

app.post("/user", (req, res)=>{
    const user  = new UserModel({
        email : req.body.email,
        firstName : req.body.firstName  
    })
    user.save().then(()=>{
        res.status(200).json({message  : "new user created "})
    }).catch(error =>{
        res.status(400).json({ message : "Invalide data "});
    })
});
app.put("/user/:id", (req, res)=>{
    UserModel.findByIdAndUpdate(req.params.id, {  email:  req.body.email , firstName : req.body.firstName}).then(()=>{
        res.status(200).json({message : "Successfull"})
    }).catch(error =>{
        res.status(400).json({message : "Failed"});
    })
})
app.delete("/user/:id", (req,res)=>{
    UserModel.findByIdAndDelete(req.params.id).then(()=>{
        res.status(200).json({message :"delete successfully"});
    }).catch(error =>{
        res.status(400).json({message : "Failed"});
    })
})

app.listen(9000 , (error)=>{
    if(error){
  console.log("the port for node app ", process.env.PORT)
        console.log(error);
        return ;
    }
    console.log("Server running on 9000")
})