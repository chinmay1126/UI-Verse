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

// Confirms and clears all tasks from both lists and storage
document.getElementById("clearAllBtn").addEventListener("click", () => {
  if(!confirm("Clear all tasks?")) return;
  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";
  localStorage.removeItem("tasks");
});

// serializes both lists to localStorage on every add, complete, or delete
function saveTasks(){
  const pending = [...pendingTasks.querySelectorAll(".task-card span")].map(s => s.textContent);
  const completed = [...completedTasks.querySelectorAll(".task-card span")].map(s => s.textContent);
  localStorage.setItem("tasks", JSON.stringify({ pending, completed }));
}

function createTaskCard(taskText, isCompleted = false){
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  const span = document.createElement("span");
  span.textContent = taskText;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "task-buttons";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.setAttribute("data-tooltip", "Delete task");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.addEventListener("click", () => { taskCard.remove(); saveTasks(); });

  if(!isCompleted){
    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.setAttribute("aria-label", "Mark task as completed");
    completeBtn.setAttribute("data-tooltip", "Mark as completed");
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeBtn.addEventListener("click", () => {
      completeBtn.remove();
      completedTasks.appendChild(taskCard);
      saveTasks();
    });
    buttonsDiv.appendChild(completeBtn);
  }

  buttonsDiv.appendChild(deleteBtn);
  taskCard.appendChild(span);
  taskCard.appendChild(buttonsDiv);
  return taskCard;
}

function addTask(){
  const taskText = taskInput.value.trim();
  if(taskText === "") return;
  pendingTasks.appendChild(createTaskCard(taskText, false));
  taskInput.value = "";
  addTaskBtn.disabled = true;
  saveTasks();
}

// runs on page load and rebuilds the cards from storage
function loadTasks(){
  const saved = localStorage.getItem("tasks");
  if(!saved) return;
  const { pending, completed } = JSON.parse(saved);
  pending.forEach(t => pendingTasks.appendChild(createTaskCard(t, false)));
  completed.forEach(t => completedTasks.appendChild(createTaskCard(t, true)));
}

loadTasks();