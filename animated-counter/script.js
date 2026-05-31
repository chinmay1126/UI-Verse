// Animated Counter - UIverse

// Count Up Animation
function animateCountUp() {
  document.querySelectorAll('.countup').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    if (!target) return;
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  });
}

// Circular Progress
function animateCircular() {
  const circumference = 251;

  const circle1 = document.getElementById('circle1');
  const circle2 = document.getElementById('circle2');

  if (circle1) {
    const offset = circumference - (75 / 100) * circumference;
    circle1.style.strokeDashoffset = offset;
  }

  if (circle2) {
    const offset = circumference - (90 / 100) * circumference;
    circle2.style.strokeDashoffset = offset;
  }
}

// Odometer
function animateOdometer() {
  const digits = ['d1', 'd2', 'd3', 'd4', 'd5'];
  const values = [1, 2, 3, 4, 5];

  digits.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      el.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        el.textContent = values[i];
        el.style.transition = 'none';
        el.style.transform = 'translateY(100%)';
        setTimeout(() => {
          el.style.transition = 'transform 0.5s ease';
          el.style.transform = 'translateY(0)';
        }, 50);
      }, 500);
    }, i * 200);
  });
}

// Minimal Counter
let minCount = 0;
function changeCount(val) {
  minCount += val;
  if (minCount < 0) minCount = 0;
  document.getElementById('minCount').textContent = minCount;
}

// Replay button
function startCountUp() {
  document.querySelectorAll('.countup').forEach(el => {
    el.textContent = '0';
  });
  document.querySelectorAll('.progress-circle').forEach(el => {
    el.style.strokeDashoffset = 251;
  });
  setTimeout(() => {
    animateCountUp();
    animateCircular();
    animateOdometer();
  }, 100);
}

// Intersection Observer - trigger on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountUp();
      animateCircular();
      animateOdometer();
      observer.disconnect();
    }
  });
}, { threshold: 0.3 });

const firstCard = document.querySelector('.counter-card');
if (firstCard) observer.observe(firstCard);