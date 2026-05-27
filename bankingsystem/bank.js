const actionButtons =
  document.querySelectorAll(".quick-actions button");

actionButtons.forEach(button => {

  button.addEventListener("click", () => {

    if (window.UIVERSE_DEBUG) alert(`${button.textContent} feature clicked`);

  });

});

function addMoney() {
  let balance = document.getElementById("balance");
  let current = parseInt(balance.innerText.replace(/[₹,]/g, ""));
  current += 1000;
  balance.innerText = "₹" + current.toLocaleString("en-IN");
}

function sendMoney() {
  alert("Transfer window opened (demo)");
}

/* Sidebar active state */
document.querySelectorAll("nav a").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
    item.classList.add("active");
  });
});