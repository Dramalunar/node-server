const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let tasks = [];

function showTasks () {

    return new Promise((resolve) => {
        console.log("=== Lista de tareas");
           if (tasks.length === 0) {
            console.log("No hay tareas")
          } else {
            tasks.forEach((task,index) => {
            console.log(`[${index + 1}] ${task.description} (${task.completed ? 'Completada' : 'Pendiente'})`)
        })
    }
    console.log("=======================");

    resolve()
    
}
    )}
 
 async function processShowTasks () {
    try {
         await showTasks();
    } catch (error) {
        console.error('Error:', error);
    }
 } 
  

function addTask() {
    return new Promise((resolve) => {
       rl.question("ingrese la descripcion de la tarea: ",(description) => {
         tasks.push({
            description,
            completed:false
         });
        
       resolve();
    });
    
    })
}

function processAddTask() {
    addTask()
    .then(() => {
        console.log("Tarea agregada correctamente.");
         processShowTasks();
        mainMenu();
    })
    .catch(error => {
        console.error('Error: ', error)
    })
}



function deletedTask() {
    return new Promise((resolve) => {
         processShowTasks();
    rl.question("Ingrese el numero de la tarea que desea eliminar: ", (index) => {
        if (index > 0 && index <= tasks.length) {
            tasks.splice(index -1,1);
            console.log("Tarea eliminada correctamente.");
        } else {
            console.log("Numero de tarea invalido.");
        }
       

        resolve();
    })
    })
}

async function processDeletedTask (){
    try {
        await deletedTask(); 
        processShowTasks();
        mainMenu();
    } catch (error) {
        console.error('Error: ',error)
    }
}



function completeTask() {
    return new Promise((resolve,) => {
        processShowTasks();
        rl.question("Ingrese el numero de la tarea que desea marcar como completada: ", (index) => {
        if (index > 0  && index <= tasks.length) {
            tasks[index - 1].completed = true;
            console.log("Tarea marcada como completada correctamente.");
        } else {
            console.log("Numero de tarea invalido.");
        }
        
        resolve();
    })
    })
}

function processCompleteTask() {
    completeTask()
    .then(() => {
        processShowTasks();
        mainMenu();
    })
    .catch(error => {
        console.error('Error: ', error)
    })
}



function mainMenu() {

         console.log("=== Menu Principal ===")
    console.log("[1] Mostrar tareas")
    console.log("[2] Agregar Tarea")
    console.log("[3] Eliminar tarea")
    console.log("[4] Marcar tarea como completada")
    console.log("[0] Salir")

 return new Promise((resolve) => {
    
    rl.question("Ingrese el numero de la opcion que desea ejecutar: ", (option) => {
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
                case "0":
                    rl.close();
                    break;
            default:
                console.log("Opcion invalida.");
                processMainMenu();
                break;
        }

        resolve();
    })
    })
   
}

async function processMainMenu () {
    try {
        await mainMenu();
    } catch (error) {
        console.error('Error: ',error)
    }
}

processMainMenu();