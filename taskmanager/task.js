const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => { if(e.key === "Enter") addTask(); });
taskInput.addEventListener("input", () => {
  addTaskBtn.disabled = taskInput.value.trim() === "";
});
addTaskBtn.disabled = true;

function addTask(){

  const taskText = taskInput.value.trim();

  if(taskText === ""){
    return;
  }

  const taskCard = document.createElement("div");

  taskCard.classList.add("task-card");

  const span = document.createElement('span');
  span.textContent = taskText;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'task-buttons';

  const completeBtn = document.createElement('button');
  completeBtn.className = 'complete-btn';
  completeBtn.setAttribute('aria-label', 'Mark as completed');
  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.setAttribute('aria-label', 'Delete task');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  buttonsDiv.appendChild(completeBtn);
  buttonsDiv.appendChild(deleteBtn);

  completeBtn.addEventListener('click', () => {
    completeBtn.remove();
    completedTasks.appendChild(taskCard);
  });

  deleteBtn.addEventListener('click', () => taskCard.remove());

  taskCard.appendChild(span);
  taskCard.appendChild(buttonsDiv);

  pendingTasks.appendChild(taskCard);

  taskInput.value = "";
}