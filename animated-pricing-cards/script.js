// Animated Pricing Cards - UIverse
// Monthly / Annual toggle

const toggle = document.getElementById('billingToggle');
const monthlyAmounts = document.querySelectorAll('.amount.monthly');
const annualAmounts = document.querySelectorAll('.amount.annual');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    monthlyAmounts.forEach(el => el.classList.add('hidden'));
    annualAmounts.forEach(el => el.classList.remove('hidden'));
  } else {
    monthlyAmounts.forEach(el => el.classList.remove('hidden'));
    annualAmounts.forEach(el => el.classList.add('hidden'));
  }
});

// Button click feedback
document.querySelectorAll('.price-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent;
    btn.textContent = 'Processing...';
    setTimeout(() => {
      btn.textContent = original;
    }, 1500);
  });
});