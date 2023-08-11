const express = require("express");
const { tasks } = require('./index.js');
const bodyParser = require("body-parser")


const app = express();


const validateHttpsMethods = (req,res,next) =>{
    const validateHttps = ['GET','PUT','POST','PATCH','DELETE']
    if(!validateHttps.includes(req.method)){
        return res.status(400).json({error:"Metodo Http invalido"})
    }
    next();
}

app.use(validateHttpsMethods);
app.use(bodyParser.json())

const editRouter = require("./routers/list-edit-router.js")
const viewRouter = require("./routers/list-view-router.js")

app.get("/tasks", (req,res) => {
    res.json(tasks)
})

app.use("/view-task",viewRouter);
app.use("/edit-task",editRouter);


app.listen(3000,() => {
    console.log(" ")
    console.log("el servidor escucha",3000)
})