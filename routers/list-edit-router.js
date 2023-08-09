const express = require("express");
const {tasks} = require("../index");
const bodyParser = require("body-parser")



const editRouter = express.Router();


editRouter.use(bodyParser.json());
 
editRouter.post("/create-task",(req,res) =>{
    const {description} = req.body;
    const newTask = { 
        description,
        completed:false}
   tasks.push(newTask);
   res.status(201).json(newTask);
})

editRouter.delete("/delete-task/:index",(req,res) =>{
    const index = req.params.index -1;
    if(index >= 0 && index < tasks.length){
        tasks.splice(index,1);
        res.status(200).send(`Tarea ${index +1} eliminada correctamente`)
    }else{
        res.status(400).send(`Tarea ${index} no encontrada`)
    }
})

editRouter.put("/update-task/:index/:description",(req,res) =>{
    const index = req.params.id;
    const description = req.params.description.toString();

    const taskUpdate = tasks.find(task => task.id === index)

    if (!taskUpdate) {
        return res.status(401).json({error:`Tarea ${taskUpdate} no encontrada`})
    } else {
        taskUpdate.description = description !== undefined ? description: taskUpdate.description
        return res.json(taskUpdate)
    }
})

module.exports = editRouter;