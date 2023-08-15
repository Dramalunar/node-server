const express = require("express");
const { tasks } = require('./index.js');
require("dotenv").config();
const jwt = require("jsonwebtoken");


const users = [
    { email: "davidejemplo@gmail.com", name: "nombre", rol: "admin",password:"12345"  },
    { email: "jenifer@gmail.com", name: "jenifer", rol: "user", password:"123456" }
  ];

const app = express();


const validateHttpsMethods = (req,res,next) =>{
    const validateHttps = ['GET','PUT','POST','PATCH','DELETE']
    if(!validateHttps.includes(req.method)){
        return res.status(400).json({error:"Metodo Http invalido"})
    }
    next();
}

app.use(validateHttpsMethods);
app.use(express.json())

const editRouter = require("./routers/list-edit-router.js")
const viewRouter = require("./routers/list-view-router.js")

app.post("/login",(req,res)=>{
 const {email,password} = req.body;

 if(!email || !password) return res.status(400).json({error:"No se encontro la informacion"});

 const user = users.find((user) => user.email === email);

 if(!user) return res.status(400).json({error:"Usuario no encontrado en la base de datos"});

 if(user.password !== password) return res.status(401).json({error:"Contraseña incorrecta"});

 const payload = {
    email: user.email,
    name: user.name,
    rol: user.rol
 }

 const token = generateToken(payload);
 
 res.header("authorization",token).json("todo bien");
})

function generateToken(payload){
return jwt.sign(payload,process.env.SECRET_KEY,{algorithm:"HS256",expiresIn:"10m"});
}

function JWTValidation(req,res,next){
     const accessToken = req.headers["authorization"];

     if(!accessToken) return res.status(401).json({error:"Token no encontrado"});

     jwt.verify(accessToken, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) return res.status(400).json({ error: "Token expirado o clave erronea" });
        req.decodedToken = decodedToken;
        next();
      });
}


app.get("/tasks",JWTValidation, (req,res) => {
    res.json(tasks)
})

app.use("/view-task",viewRouter);
app.use("/edit-task",editRouter);


app.listen(3000,() => {
    console.log(" ")
    console.log("el servidor escucha",3000)
})