//LISTA DE TAREAS
let listaTareas = [];
let id = 1;
const form = document.querySelector("#formulario");
const taskInput = document.querySelector("#input-task")

//EVENTOS
form.addEventListener("submit", addTask);


//AGREGAR TAREAS
function addTask(event){
    event.preventDefault();
    if(taskInput.value.trim() !== ""){
        const task = {
            id: id,
            status: "toDo",
            value: taskInput.value,
        };

        listaTareas.push(task);
        id++;
        form.reset();
        // console.log(listaTareas);
    }else{
        alert("Debe rellenar el input");
    }
}