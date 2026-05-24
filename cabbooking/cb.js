const rideCards = document.querySelectorAll(".ride-card");

rideCards.forEach(card => {

  card.addEventListener("click", () => {

    rideCards.forEach(c => c.classList.remove("active"));

    card.classList.add("active");

  });

});

function bookRide(){
  alert("Ride Booked Successfully!");
}

function bookRide() {
  alert("🚖 Ride Booked Successfully!");
}

function selectRide(element) {
  let cards = document.querySelectorAll(".ride-card");
  cards.forEach(card => card.classList.remove("active"));
  element.classList.add("active");
}

function bookRide() {
  alert("🚖 Ride Confirmed! Driver is on the way.");
}

function selectRide(el) {
  document.querySelectorAll(".ride").forEach(r => r.classList.remove("active"));
  el.classList.add("active");
}