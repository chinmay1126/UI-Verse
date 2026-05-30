const clock = document.getElementById("clock");

function updateClock(){

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();

// clock.js

// DIGITAL CLOCK

function updateClock() {

  const now = new Date();

  const time = now.toLocaleTimeString();

  const fullDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  document.getElementById("clock").innerHTML = time;

  document.getElementById("date").innerHTML = fullDate;
}

setInterval(updateClock, 1000);

updateClock();


// CALENDAR

const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar() {

  calendarDays.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.innerHTML = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  // Empty spaces

  for(let i = 0; i < firstDay; i++) {

    const emptyDiv = document.createElement("div");

    emptyDiv.classList.add("empty");

    calendarDays.appendChild(emptyDiv);
  }

  // Dates

  for(let day = 1; day <= lastDate; day++) {

    const dayDiv = document.createElement("div");

    dayDiv.innerHTML = day;

    const today = new Date();

    if(
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    calendarDays.appendChild(dayDiv);
  }
}

prevMonth.addEventListener("click", () => {

  currentDate.setMonth(currentDate.getMonth() - 1);

  renderCalendar();
});

nextMonth.addEventListener("click", () => {

  currentDate.setMonth(currentDate.getMonth() + 1);

  renderCalendar();
});

renderCalendar();