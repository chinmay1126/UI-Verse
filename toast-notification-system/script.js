const toastContainer = document.getElementById('toast-container');

const icons = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i'
};

function showToast(type, message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = icons[type] || '';
  
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close" aria-label="Close Toast">&times;</button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Handle close button
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    hideToast(toast);
  });
  
  // Auto remove
  setTimeout(() => {
    hideToast(toast);
  }, duration);
}

function hideToast(toast) {
  if (toast.classList.contains('hiding')) return;
  toast.classList.add('hiding');
  toast.addEventListener('animationend', () => {
    toast.remove();
  });
}
