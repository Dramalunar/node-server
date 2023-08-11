const express = require("express");
const {tasks} = require("../index")

const viewRouter = express.Router()


const validateParams = (req,res,next) =>{
    if (!req.body.description || typeof req.body.description !== "string") {
        return res
          .status(400)
          .json({ error: "Información no válida o atributos faltantes" });
      }
      next()
};


viewRouter.use(validateParams);

viewRouter.get("/complete-task",(req,res) => {
const completeTasks = tasks.filter(task => task.completed === true);

if (completeTasks) {
    return res.json(completeTasks)
} else {
 return res.status(401).json({error:"ni modo perro,algo va mal"})   
}
}) 


viewRouter.get("/incomplete-task",(req,res) => {
const inCompleteTasks = tasks.filter(task => task.completed === false);


if (inCompleteTasks) {
    return res.json(inCompleteTasks)
} else {
 return res.status(401).json({error:"ni modo perro,algo va mal"})   
}

})

module.exports = viewRouter;