const express = require("express");
const {tasks} = require("../index")

const viewRouter = express.Router()


const validateParams = (req, res, next) => {
    const id = req.params.id;
  
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }
  
    next();
  };

  

viewRouter.get("/complete-task",(req,res) => {
const completeTasks = tasks.filter(task => task.completed === true);

if (completeTasks) {
    return res.json(completeTasks)
} else {
 return res.status(404).json({error:"Error al tomar las tareas"})   
}
}) 


viewRouter.get("/incomplete-task",(req,res) => {
const inCompleteTasks = tasks.filter(task => task.completed === false);


if (inCompleteTasks) {
    return res.json(inCompleteTasks)
} else {
 return res.status(404).json({error:"Error al tomar las tareas"})   
}

})

viewRouter.get("/task/:id",validateParams,(req,res)=>{
    const id = req.params.id;
    
    const task = tasks[id];

    if(task === undefined)return res.status(404).json({error:"Tarea no encontrada"});

    res.status(200).json({task});

})

module.exports = viewRouter;