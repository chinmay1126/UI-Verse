/* =====================================================
DRAG ELEMENTS
===================================================== */

const cards =
  document.querySelectorAll(
    ".task-card"
  );

const columns =
  document.querySelectorAll(
    ".task-list"
  );

/* =====================================================
DRAG START
===================================================== */

cards.forEach(card=>{

  card.addEventListener(
    "dragstart",
    ()=>{

      card.classList.add(
        "dragging"
      );

    }
  );

  card.addEventListener(
    "dragend",
    ()=>{

      card.classList.remove(
        "dragging"
      );

    }
  );

});

/* =====================================================
DROP LOGIC
===================================================== */

columns.forEach(column=>{

  column.addEventListener(
    "dragover",
    (e)=>{

      e.preventDefault();

      const dragging =
        document.querySelector(
          ".dragging"
        );

      column.appendChild(
        dragging
      );

    }
  );

});

/* =====================================================
NEW TASK BUTTON
===================================================== */

const addBtn =
  document.querySelector(
    ".primary-btn"
  );

const todoColumn =
  document.getElementById(
    "todo"
  );

// Subscribe to state manager to render updates
if (typeof UIVerseStateManager !== 'undefined') {
  UIVerseStateManager.subscribe('kanban.tasks', (tasks) => {
    if (!tasks) return;
    const lastTask = tasks[tasks.length - 1];
    if (lastTask && !document.getElementById(`task-${lastTask.id}`)) {
      renderTaskToBoard(lastTask);
    }
  });
}

function renderTaskToBoard(taskData) {
  const task = document.createElement("div");
  task.id = `task-${taskData.id}`;
  task.classList.add("task-card");
  task.setAttribute("draggable", "true");
  task.innerHTML = `
    <div class="task-top">
      <span class="task-badge ui">New</span>
      <i class="fa-solid fa-star"></i>
    </div>
    <h3>${taskData.title}</h3>
    <p>${taskData.description}</p>
    <div class="task-footer">
      <div class="task-users">
        <img src="https://i.pravatar.cc/100?img=52" alt="">
      </div>
      <span>Today</span>
    </div>
  `;

  todoColumn.appendChild(task);

  // Re-attach drag listeners to the new element
  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });
}

addBtn.addEventListener(
  "click",
  ()=>{
    // Dispatch state update to match implementation
    if (typeof UIVerseStateManager !== 'undefined') {
      const currentTasks = UIVerseStateManager.getState('kanban.tasks', []);
      UIVerseStateManager.setState('kanban.tasks', [
        ...currentTasks,
        { 
          id: Date.now(), 
          title: 'New UIverse Task', 
          description: 'Create another premium component for the platform.',
          status: 'todo' 
        }
      ]);
    }
  }
);

/* =====================================================
NAVBAR SCROLL
===================================================== */

window.addEventListener(
  "scroll",
  ()=>{

    const navbar =
      document.querySelector(
        ".navbar"
      );

    if(window.scrollY > 20){

      navbar.style.background =
        "rgba(5,8,22,.95)";

    }else{

      navbar.style.background =
        "rgba(5,8,22,.82)";
    }

  }
);

// Drag-and-drop logic
let draggedCard = null;

document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("task-card")) {
    draggedCard = e.target;
    e.target.style.opacity = "0.5";
  }
});

document.addEventListener("dragend", e => {
  if (e.target.classList.contains("task-card")) {
    draggedCard = null;
    e.target.style.opacity = "1";
  }
});

document.querySelectorAll(".task-list").forEach(list => {
  list.addEventListener("dragover", e => e.preventDefault());
  list.addEventListener("drop", e => {
    if (draggedCard) {
      list.appendChild(draggedCard);
      updateCounts();
    }
  });
});

function updateCounts() {
  document.querySelectorAll(".kanban-column").forEach(column => {
    const count = column.querySelectorAll(".task-card").length;
    column.querySelector(".task-count").textContent = count;
  });
}

// Run once on load
updateCounts();

document.querySelector(".primary-btn").addEventListener("click", () => {
  const title = prompt("Enter task title:");
  const desc = prompt("Enter task description:");
  if (title) {
    const card = document.createElement("div");
    card.className = "task-card";
    card.setAttribute("draggable", "true");
    card.innerHTML = `
      <div class="task-top">
        <span class="task-badge dev">New</span>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <h3>${title}</h3>
      <p>${desc || ""}</p>
      <div class="task-footer">
        <div class="task-users"></div>
        <span>New</span>
      </div>
    `;
    document.getElementById("todo").appendChild(card);
    updateCounts();
  }
});

document.querySelector(".search-bar input").addEventListener("keyup", e => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".task-card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(query) ? "" : "none";
  });
});
const cards = document.querySelectorAll(".task-card");
const columns = document.querySelectorAll(".task-list");

let draggedCard = null;

cards.forEach(card => {
  card.addEventListener("dragstart", () => {
    draggedCard = card;
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    draggedCard = null;
  });
});

columns.forEach(column => {
  column.addEventListener("dragover", e => {
    e.preventDefault();
  });

  column.addEventListener("drop", () => {
    if (draggedCard) {
      column.appendChild(draggedCard);
    }
  });
});
