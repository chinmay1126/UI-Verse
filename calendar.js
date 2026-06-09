const monthYearEl = document.getElementById('monthYear');
const calendarDates = document.getElementById('calendarDates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const eventDays = [3, 7, 12, 18, 24];

const today = new Date();
let current = { year: today.getFullYear(), month: today.getMonth() };

function renderCalendar() {
  const { year, month } = current;
  monthYearEl.textContent = `${MONTHS[month]} ${year}`;
  calendarDates.innerHTML = '';

  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = document.createElement('div');
    d.className = 'date inactive';
    d.textContent = prevMonthDays - i;
    calendarDates.appendChild(d);
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = document.createElement('div');
    d.className = 'date';
    d.textContent = day;

    const isToday =
      day   === today.getDate()  &&
      month === today.getMonth() &&
      year  === today.getFullYear();

    if (isToday) d.classList.add('today');
    if (eventDays.includes(day)) d.classList.add('has-event');

    d.addEventListener('click', () => {
      calendarDates.querySelectorAll('.selected')
        .forEach(el => el.classList.remove('selected'));
      if (!isToday) d.classList.add('selected');
    });

    calendarDates.appendChild(d);
  }

  const totalCells = calendarDates.children.length;
  const remaining  = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    const d = document.createElement('div');
    d.className = 'date inactive';
    d.textContent = i;
    calendarDates.appendChild(d);
  }
}

prevBtn.addEventListener('click', () => {
  current.month--;
  if (current.month < 0) { current.month = 11; current.year--; }
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  current.month++;
  if (current.month > 11) { current.month = 0; current.year++; }
  renderCalendar();
});

renderCalendar();