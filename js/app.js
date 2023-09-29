

// Elementos
let taskList = JSON.parse(localStorage.getItem("lista")) || [];
let id = taskList.length;
const form = document.querySelector("#formulario");
const taskInput = document.querySelector("#input-task");
const taskConteiner = document.querySelector("#lista-tareas");

// Mostrar las tareas de localstorage al cargar la página
mostrarTarea();

// EVENTOS
form.addEventListener("submit", addTask);
taskConteiner.addEventListener("click", deleteTask);
taskConteiner.addEventListener("click", crossOut);


// AGREGAR TAREAS
function addTask(event) {
    event.preventDefault();
    taskList.push({ task: taskInput.value, estado: "pendiente" }); //el "estado" dentro del objeto lo hice para usarlo en el tachado de las tareas listas pero al final no lo usé, ver si aplica usarlo
    taskInput.value = ""; // Limpia el campo de entrada
    localStorage.setItem("lista", JSON.stringify(taskList));
    mostrarTarea();
    id++;
  };
  
//MOSTRAR TAREAS EN LA PAGINA (ATRAVÉS DEL LOCALSTORAGE)

  function mostrarTarea() {
    taskConteiner.innerHTML = "";
  
    for (let i = 0; i < taskList.length; i++) {
      taskConteiner.innerHTML += `
        <div class="alert alert-warning d-flex justify-content-between align-items-center key${i}">
          <p class="m-0">${taskList[i].task}</p>
          <h3 class="m-0">
            <i class="fas fa-check-circle text-success tachar" data-index="${i}"></i>
            <i class="fas fa-minus-circle text-danger borrar" data-index="${i}"></i>
          </h3>
        </div>`;
    };
  };


// ELMINIAR TAREAS (ELIMINA DE LA PÁGINA Y TAMBIÉN DEL LOCALSTORAGE)

// TAL VEZ NO ES NECESARIO ELIMINAR DE LA PÁGINA SINO SOLO DEL ARRAY Y LUEGO ACTUALIZAR, VERLO DESPÚES PARA OPTIMIZAR EL CÓDIGO
  function deleteTask(event) {
    if (event.target.classList.contains("borrar")) {
      const index = event.target.getAttribute("data-index");
      if (index !== null) {
        // Elimina el elemento del array taskList en el índice
        taskList.splice(index, 1);
        localStorage.setItem("lista", JSON.stringify(taskList));
        mostrarTarea();
      };
      // Accede al elemento padre (el div que contiene todo) y lo elimina
      const elementoPadre = event.target.closest(".alert");
      if (elementoPadre) {
        elementoPadre.remove();
      };
    };
  };

  //TACHA LAS TAREAS YA EJECUTADAS
  
  function crossOut(event) {
    if (event.target.classList.contains("tachar")) {
      const index = event.target.getAttribute("data-index");
      if (index !== null) {
        // accede a la etiqueta  <p> que contiene el texto de la tarea
        const tareaParaTachar = document.querySelector(`.key${index} p`);
        if (tareaParaTachar) {
          // tacha el texto
          tareaParaTachar.style.textDecoration = "line-through";
        };
      };
    };
  };