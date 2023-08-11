const express = require("express");
const { tasks } = require("../index");

const editRouter = express.Router();

const handleValidationErrors = (req, res, next) => {
  if (
    (req.method === "POST" || req.method === "PUT") && (Object.keys(req.body).length === 0)) {
    return res.status(400).json({ error: "Esto esta mal" });
  }

  if (
    (req.method === "POST" || req.method === "PUT") &&
    (!req.body.description || typeof req.body.description !== "string")
  ) {
    return res
      .status(400)
      .json({ error: "Información no válida o atributos faltantes" });
  }

  next();
};

editRouter.use(handleValidationErrors);

editRouter.post("/create-task", (req, res) => {
  const { description } = req.body;
  const newTask = {
    description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

editRouter.delete("/delete-task/:index", (req, res) => {
  const index = req.params.index - 1;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res
      .status(200)
      .json({ message: `Tarea ${index + 1} eliminada correctamente` });
  } else {
    res.status(400).json({ error: `Tarea ${index} no encontrada` });
  }
});

editRouter.put("/update-task", (req, res) => {
  const index = req.body.index - 1;
  const description = req.body.description.toString();

  if (index >= 0 && index < tasks.length) {
    tasks[index].description = description;
    res.status(200).json({ message: `Tarea ${index+1} editada correctamente` });
  } else {
    res.status(400).json({ error: `Tarea ${index+1} no encontrada` });
  }
});

module.exports = editRouter;
