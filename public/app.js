const $form = document.getElementById("task-form");
const $taskContainer = document.getElementById("tasks-container");
// const $taskWarning = document.getElementById("task-warning");
const $template = document.getElementById("task-template");
const $fragment = document.createDocumentFragment();
let tasks = {};

/*** Functions ***/
const setTask = (e) => {
  const $input = e.target.querySelector("input");

  if ($input.value.trim() === "") {
    console.log("Input Vacío!");
    return;
  }
  /* -Creating new task- */
  const newTask = {
    id: Date.now(),
    text: $input.value,
    state: false,
  };
  /* -Adding new task- */
  console.log(tasks);
  tasks[newTask.id] = newTask;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  $form.reset();
  $input.focus();
};
/* Task edition */
const editTask = (e) => {
  const $input = e.target.querySelector("input");

  if ($input.value.trim() === "") {
    console.log("Input Vacío!");
    return;
  }

  if (Object.values(tasks).length !== 0) {
    // console.log(tasks);
    // console.log(tasks[e.target.dataset.id].text);
    tasks[e.target.dataset.id].text = $input.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
};
/* Creating the warning or task elemt */
const renderTasks = () => {
  /* Getting tasks from localStrg */
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  // tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks === null || Object.values(tasks).length === 0) {
    $taskContainer.innerHTML = `
        <article
          class="alert alert-warning d-flex justify-content-center align-items-center my-2"
          id="task-warning">
          <p class="m-0">
            No hay tareas pendientes <i class="fa-solid fa-face-smile-wink"></i>
          </p>
        </article>`;
    return;
  }
  /* -Empty task container- */
  $taskContainer.innerHTML = ``;
  /* -Rendering tasks- */
  Object.values(tasks).forEach((task) => {
    const $clone = $template.content.cloneNode(true);
    const $doneBtn = $clone.getElementById("done-task-btn");
    const $rmBtn = $clone.getElementById("rm-task-btn");

    /* Setting done tasks styles */
    if (task.state) {
      $doneBtn.classList.replace("fa-check", "fa-rotate-left");
      $clone
        .querySelector(".alert")
        .classList.replace("alert-primary", "alert-success");
      $clone.querySelector("p").style.textDecoration = "line-through";
    }

    $clone.querySelector("p").textContent = task.text;
    /* -Adding data-id to btns- */
    $doneBtn.dataset.id = task.id;
    $rmBtn.dataset.id = task.id;
    $clone.getElementById("edit-task-btn").dataset.id = task.id;
    // $clone.querySelector("article.alert").dataset.id = task.id;
    $fragment.appendChild($clone);
  });
  $taskContainer.appendChild($fragment);

  /* -Resetting style after editting- */
  $form.removeAttribute("data-id");
  $form.querySelector("button").textContent = "Agregar tarea";
  $form
    .querySelector("button")
    .classList.replace("btn-secondary", "btn-primary");
  $form.reset();
};
/* buttons actions */
const btnActions = (e) => {
  /* Done task */
  try {
    if (e.target.classList.contains("fa-check")) {
      tasks[e.target.dataset.id].state = true;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
    /* Undo task */
    if (e.target.classList.contains("fa-rotate-left")) {
      tasks[e.target.dataset.id].state = false;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
    /* Delete Task*/
    if (e.target.id === "rm-task-btn") {
      delete tasks[e.target.dataset.id];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
    /* Send task to edittion */
    if (e.target.id === "edit-task-btn") {
      $form.querySelector("input").value =
        e.target.parentElement.previousElementSibling.textContent;
      $form.dataset.id = e.target.dataset.id;
      $form
        .querySelector("button")
        .classList.replace("btn-primary", "btn-secondary");
      $form.querySelector("button").textContent = "Editar tarea";
    }
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // console.log(
  //   typeof localStorage.getItem("tasks"),
  //   localStorage.getItem("tasks")
  // );
  if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  renderTasks();
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.dataset.id === undefined ? setTask(e) : editTask(e);
  // setTask(e);
});

document.addEventListener("click", (e) => {
  btnActions(e);
});
