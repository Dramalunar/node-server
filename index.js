const axios = require("axios");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];

function showTasks() {
  return new Promise((resolve) => {
    console.log("  === \x1b[32mLista de tareas\x1b[0m===");
    console.log(" ")
    if (tasks.length === 0) {
      console.log("       \x1b[31mNo hay tareas\x1b[0m");
    } else {
      tasks.forEach((task, index) => {
        console.log(
          `   [${index +1 }] ${task.description} (${
            task.completed ? "Completada" : "Pendiente"
          })`
        );
      });
    }
    console.log("")
    console.log("  =======================");

    resolve();
  });
}

async function processShowTasks() {
  try {
    await showTasks();
  } catch (error) {
    console.error("Error:", error);
  }
}

function addTask() {
  return new Promise((resolve) => {
    rl.question("ingrese la descripcion de la tarea: ", async (description) => {
      const response = await axios.post(
        `http://localhost:3000/edit-task/create-task`,
        {
          description,
        }
      );
      

      resolve();
    });
  });
}

function processAddTask() {
  addTask()
    .then(() => {
      console.log("")
      console.log("Tarea agregada correctamente.");
      console.log("")
      processShowTasks();
      mainMenu();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function deletedTask() {
  return new Promise((resolve) => {
    processShowTasks();
    rl.question(
      "Ingrese el numero de la tarea que desea eliminar: ",
      async (index) => {
        const response = await axios.delete(
          `http://localhost:3000/edit-task/delete-task/${index}`
        );
        console.log("tarea eliminada con express",response.data);

        resolve();
      }
    );
  });
}

async function editTask () {
return new Promise(async(resolve, reject) => {

  processShowTasks();
  const index = await new Promise((innerResolve) => {
    rl.question("ingresa el numero de la tarea que desea actualizar ",(index) =>{
    innerResolve(parseInt(index));
    
  })
  })
   
  if (index >= 0 && index <= tasks.length) {
     const description = await new Promise((innerResolve) =>{
      rl.question("Ingresa tu nueva descripcion: ",(description)=>{
        innerResolve(description)
      })
     })
      const response = await axios.put(`http://localhost:3000/edit-task/update-task`,{
        index:index,
        description:description,
      })

      console.log("tarea editada correctamente perro",response.data);
      }else{
      console.log("Numero invalido, joder que bobo eres")
    }
    resolve();
  
  })
}


async function processEditTask () {
  try {
    await editTask();
    mainMenu();
  } catch (error) {
    console.log("Error:", error)
  }
}


async function processDeletedTask() {
  try {
    await deletedTask();
    processShowTasks();
    mainMenu();
  } catch (error) {
    console.error("Error: ", error);
  }
}

function completeTask() {
  return new Promise((resolve) => {
    processShowTasks();
    rl.question(
      "Ingrese el numero de la tarea que desea marcar como completada: ",
      (index) => {
        if (index > 0 && index <= tasks.length) {
          tasks[index - 1].completed = true;
          console.log("Tarea marcada como completada correctamente.");
        } else {
          console.log("Numero de tarea invalido.");
        }

        resolve();
      }
    );
  });
}

function processCompleteTask() {
  completeTask()
    .then(() => {
      processShowTasks();
      mainMenu();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function mainMenu() {
  console.log(" ")
  console.log(" \x1b[34m=== Menu Principal ===\x1b[0m");
  console.log("   [\x1b[31m1\x1b[0m] \x1b[32mMostrar tareas\x1b[0m");
  console.log("   [\x1b[31m2\x1b[0m] \x1b[33mAgregar Tarea\x1b[0m");
  console.log("   [\x1b[31m3\x1b[0m] \x1b[35mEliminar tarea\x1b[0m");
  console.log("   [\x1b[31m4\x1b[0m] \x1b[36mMarcar tarea como completada\x1b[0m");
  console.log("   [\x1b[31m5\x1b[0m] \x1b[34mEditar tarea\x1b[0m");
  console.log("   [\x1b[31m0\x1b[0m] \x1b[37mSalir\x1b[0m");

  return new Promise((resolve) => {
    console.log("")
    rl.question(
      "Ingrese el numero de la opcion que desea ejecutar: ",
      (option) => {
        console.log("\n");
        switch (option) {
          case "1":
            processShowTasks();
            processMainMenu();
            break;
          case "2":
            processAddTask();
            break;
          case "3":
            processDeletedTask();
            break;
          case "4":
            processCompleteTask();
            break;
          case "5":
            processEditTask();
            break;
          case "0":
            rl.close();
            break;
          default:
            console.log("Opcion invalida.");
            processMainMenu();
            break;
        }
       
        resolve();
      }
    );
  });
}

async function processMainMenu() {
  try {
    await mainMenu();
  } catch (error) {
    console.error("Error: ", error);
  }
}

processMainMenu();

module.exports = { tasks };
