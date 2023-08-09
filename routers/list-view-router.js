const express = require("express");
const {tasks} = require("../index")

const viewRouter = express.Router()

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