const readline = require('readline');
const { Z_ASCII } = require('zlib');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let tasks = [];

function showTasks () {
    console.log("=== Lista de tareas");
    if (tasks.length === 0) {
        console.log("No hay tareas")
    } else {
        tasks.forEach((task,index) => {
            console.log(`[${index + 1}] ${task.description} (${task.completed ? 'Completada' : 'Pendiente'})`)
        })
    }
    console.log("=======================")
}

function addTask() {
    rl.question("ingrese la descripcion de la tarea: ",(description) => {
        tasks.push({
            description,
            completed:false
        });
        console.log("Tarea agregada correctamente.")
        showTasks();
        mainMenu();
    });
}

function deletedTask() {
    showTasks();
    rl.question("Ingrese el numero de la tarea que desea eliminar: ", (index) => {
        if (index > 0 && index <= tasks.length) {
            tasks.splice(index -1,1);
            console.log("Tarea eliminada correctamente.");
        } else {
            console.log("Numero de tarea invalido.");
        }
        showTasks();
        mainMenu();
    })
}


function completeTask() {
    showTasks();
    rl.question("Ingrese el numero de la tarea que desea marcar como completada: ", (index) => {
        if (index > 0  && index <= tasks.length) {
            tasks[index - 1].completed = true;
            console.log("Tarea marcada como completada correctamente.");
        } else {
            console.log("Numero de tarea invalido.");
        }
        showTasks();
        mainMenu();
    })
}

function mainMenu() {
    console.log("=== Menu Principal ===")
    console.log("[1] Mostrar tareas")
    console.log("[2] Agregar Tarea")
    console.log("[3] Eliminar tarea")
    console.log("[4] Marcar tarea como completada")
    console.log("[0] Salir")

    rl.question("Ingrese el numero de la opcion que desea ejecutar: ", (option) => {
        switch (option) {
            case "1":
                showTasks();
                mainMenu();
                break;
            case "2":
                addTask();
                break;
            case "3":
                deletedTask();
                break;
            case "4":
                completeTask();
                break;
                case "0":
                    rl.close();
                    break;
            default:
                console.log("Opcion invalida.");
                mainMenu();
                break;
        }
    })
}

mainMenu();