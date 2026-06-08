const timelineItems = document.querySelectorAll(".timeline-item");

function showTimeline() {
  timelineItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < window.innerHeight - 100) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showTimeline);

showTimeline();

const items = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

items.forEach((item) => {
  observer.observe(item);
});