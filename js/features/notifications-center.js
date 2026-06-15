(function () {
  const API_BASE = window.__NOTIFICATION_API_BASE__ || 'http://127.0.0.1:5000';

  const sourceSelect = document.getElementById('sourceSelect');
  const refreshBtn = document.getElementById('refreshBtn');
  const syncState = document.getElementById('syncState');
  const alertsList = document.getElementById('alertsList');

  if (!sourceSelect || !refreshBtn || !syncState || !alertsList) {
    return;
  }

  function setSyncState(message, tone = 'neutral') {
    syncState.textContent = message;
    syncState.dataset.tone = tone;
  }

  function createNotificationCard(notification) {
    const card = document.createElement('article');
    card.className = `alert-card ${notification.severity === 'high' ? 'high' : ''}`;

    const title = document.createElement('h3');
    title.textContent = `${notification.title} · ${notification.source_type}`;

    const message = document.createElement('p');
    message.textContent = notification.message;

    const meta = document.createElement('div');
    meta.className = 'alert-meta';

    const recipient = document.createElement('span');
    recipient.textContent = `${notification.recipient}`;

    const status = document.createElement('span');
    status.textContent = `${notification.notification_type.toUpperCase()} · ${notification.created_at}`;

    meta.append(recipient, status);

    if (notification.related_url) {
      const link = document.createElement('a');
      link.href = notification.related_url;
      link.textContent = 'Open related page';
      link.className = 'notification-link';
      meta.appendChild(link);
    }

    card.append(title, message, meta);
    return card;
  }

  function renderNotifications(notifications) {
    alertsList.innerHTML = '';

    if (!notifications.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No notifications found for this filter.';
      alertsList.appendChild(empty);
      return;
    }

    notifications.forEach((notification) => alertsList.appendChild(createNotificationCard(notification)));
  }

  async function refreshNotifications() {
    try {
      setSyncState('Refreshing notifications…');
      const source = sourceSelect.value;
      const params = new URLSearchParams();
      if (source && source !== 'all') params.set('source', source);
      params.set('limit', '40');

      const response = await fetch(`${API_BASE}/api/notifications?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Notification lookup failed with status ${response.status}`);
      }

      const payload = await response.json();
      renderNotifications(payload.notifications || []);
      setSyncState(`Synced at ${new Date().toLocaleTimeString()}`, 'success');
    } catch (error) {
      console.error(error);
      setSyncState('Unable to reach the notification API.', 'error');
    }
  }

  sourceSelect.addEventListener('change', refreshNotifications);
  refreshBtn.addEventListener('click', refreshNotifications);

  refreshNotifications();
  window.setInterval(refreshNotifications, 30000);
})();