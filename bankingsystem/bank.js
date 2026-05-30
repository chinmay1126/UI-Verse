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

const balanceElement = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");

let balance = 125000;

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function updateBalance() {
  balanceElement.textContent = formatCurrency(balance);
}

function createTransaction(title, amount, type) {
  const div = document.createElement("div");
  div.classList.add("txn", type);

  div.innerHTML = `
    <span>${title}</span>
    <b>${type === "income" ? "+" : "-"} ${formatCurrency(amount)}</b>
  `;

  transactionList.prepend(div);
}

function addMoney() {
  const amount = Number(prompt("Enter amount to add:"));

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  balance += amount;
  updateBalance();
  createTransaction("Money Added", amount, "income");

  alert(`${formatCurrency(amount)} added successfully!`);
}

function sendMoney() {
  const amount = Number(prompt("Enter amount to send:"));

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  if (amount > balance) {
    alert("Insufficient balance.");
    return;
  }

  balance -= amount;
  updateBalance();
  createTransaction("Money Sent", amount, "expense");

  alert(`${formatCurrency(amount)} sent successfully!`);
}

function payBills() {
  const amount = 2500;

  if (balance < amount) {
    alert("Insufficient balance.");
    return;
  }

  balance -= amount;
  updateBalance();
  createTransaction("Bill Payment", amount, "expense");

  alert("Bill paid successfully!");
}

function recharge() {
  const amount = 399;

  if (balance < amount) {
    alert("Insufficient balance.");
    return;
  }

  balance -= amount;
  updateBalance();
  createTransaction("Mobile Recharge", amount, "expense");

  alert("Recharge successful!");
}

function clearTransactions() {
  transactionList.innerHTML = "";
}

updateBalance();

