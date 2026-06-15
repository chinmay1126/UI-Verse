(function () {
  const API_BASE = window.__IOT_API_BASE__ || 'http://127.0.0.1:5000';

  const deviceSelect = document.getElementById('deviceSelect');
  const refreshBtn = document.getElementById('refreshBtn');
  const syncState = document.getElementById('syncState');
  const alertsList = document.getElementById('alertsList');

  if (!deviceSelect || !refreshBtn || !syncState || !alertsList) {
    return;
  }

  function setSyncState(message, tone = 'neutral') {
    syncState.textContent = message;
    syncState.dataset.tone = tone;
  }

  function createAlertCard(alert) {
    const card = document.createElement('article');
    card.className = `alert-card ${alert.severity === 'high' ? 'high' : ''}`;

    const title = document.createElement('h3');
    title.textContent = `${alert.device_id} · ${alert.alert_type === 'irrigation' ? 'Irrigation needed' : 'Sensor alert'}`;

    const message = document.createElement('p');
    message.textContent = alert.message;

    const meta = document.createElement('div');
    meta.className = 'alert-meta';

    const farmer = document.createElement('span');
    farmer.textContent = `${alert.farmer_name} · ${alert.farm_name}`;

    const status = document.createElement('span');
    status.textContent = `${alert.channel.toUpperCase()} · ${alert.created_at}`;

    meta.append(farmer, status);
    card.append(title, message, meta);
    return card;
  }

  function renderAlerts(alerts) {
    alertsList.innerHTML = '';

    if (!alerts.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No alerts have been generated yet.';
      alertsList.appendChild(empty);
      return;
    }

    alerts.forEach((alert) => alertsList.appendChild(createAlertCard(alert)));
  }

  async function loadDevices() {
    const response = await fetch(`${API_BASE}/api/iot/devices`);
    if (!response.ok) {
      throw new Error(`Device lookup failed with status ${response.status}`);
    }

    const payload = await response.json();
    const devices = payload.devices || [];

    deviceSelect.innerHTML = '<option value="">All devices</option>';
    devices.forEach((device) => {
      const option = document.createElement('option');
      option.value = device.device_id;
      option.textContent = `${device.device_id} · ${device.farm_name}`;
      deviceSelect.appendChild(option);
    });
  }

  async function refreshAlerts() {
    try {
      setSyncState('Refreshing alerts…');
      const deviceId = deviceSelect.value;
      const params = new URLSearchParams();
      if (deviceId) params.set('device_id', deviceId);
      params.set('limit', '20');

      const response = await fetch(`${API_BASE}/api/iot/alerts?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Alert lookup failed with status ${response.status}`);
      }

      const payload = await response.json();
      renderAlerts(payload.alerts || []);
      setSyncState(`Synced at ${new Date().toLocaleTimeString()}`, 'success');
    } catch (error) {
      console.error(error);
      setSyncState('Unable to reach the notification API.', 'error');
    }
  }

  async function boot() {
    await loadDevices();
    await refreshAlerts();
  }

  deviceSelect.addEventListener('change', refreshAlerts);
  refreshBtn.addEventListener('click', refreshAlerts);

  boot();
  window.setInterval(refreshAlerts, 30000);
})();