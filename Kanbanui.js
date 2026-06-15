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