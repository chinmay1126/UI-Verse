(function () {
  const API_BASE = window.__IOT_API_BASE__ || 'http://127.0.0.1:5000';
  const pollIntervalMs = 60000;

  const deviceSelect = document.getElementById('deviceSelect');
  const thresholdInput = document.getElementById('thresholdInput');
  const refreshBtn = document.getElementById('refreshBtn');
  const syncState = document.getElementById('syncState');
  const irrigationStatus = document.getElementById('irrigationStatus');
  const recommendationText = document.getElementById('recommendationText');
  const farmerValue = document.getElementById('farmerValue');
  const farmValue = document.getElementById('farmValue');
  const readingValue = document.getElementById('readingValue');
  const readingTime = document.getElementById('readingTime');
  const alertCount = document.getElementById('alertCount');
  const alertsList = document.getElementById('alertsList');

  const moistureCanvas = document.getElementById('moistureGauge');
  const temperatureCanvas = document.getElementById('temperatureGauge');
  const humidityCanvas = document.getElementById('humidityGauge');
  const historyCanvas = document.getElementById('historyChart');

  if (!deviceSelect || !thresholdInput || !moistureCanvas || !temperatureCanvas || !humidityCanvas || !historyCanvas) {
    return;
  }

  let moistureGauge;
  let temperatureGauge;
  let humidityGauge;
  let historyChart;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function formatValue(value, suffix = '') {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return '—';
    return `${numeric.toFixed(1)}${suffix}`;
  }

  function setSyncState(message, tone = 'neutral') {
    syncState.textContent = message;
    syncState.dataset.tone = tone;
  }

  function buildGauge(canvas, label, color) {
    return new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: [label, 'Remaining'],
        datasets: [{
          data: [0, 100],
          backgroundColor: [color, 'rgba(24, 34, 28, 0.08)'],
          borderWidth: 0,
          hoverOffset: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '74%',
        rotation: -90,
        circumference: 180,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
      plugins: [{
        id: 'gaugeLabel',
        afterDraw(chart) {
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          const dataset = chart.data.datasets[0];
          const value = dataset.data[0];
          ctx.save();
          ctx.textAlign = 'center';
          ctx.fillStyle = '#18221c';
          ctx.font = '800 28px Manrope, sans-serif';
          ctx.fillText(`${Number(value).toFixed(1)}%`, chartArea.left + chartArea.width / 2, chartArea.top + chartArea.height / 2 - 8);
          ctx.fillStyle = '#5c6b62';
          ctx.font = '700 13px Manrope, sans-serif';
          ctx.fillText(label, chartArea.left + chartArea.width / 2, chartArea.top + chartArea.height / 2 + 18);
          ctx.restore();
        },
      }],
    });
  }

  function buildHistoryChart() {
    return new Chart(historyCanvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Moisture',
            data: [],
            borderColor: '#226b47',
            backgroundColor: 'rgba(34, 107, 71, 0.15)',
            tension: 0.36,
            fill: true,
          },
          {
            label: 'Temperature',
            data: [],
            borderColor: '#b67a17',
            backgroundColor: 'rgba(182, 122, 23, 0.12)',
            tension: 0.36,
          },
          {
            label: 'Humidity',
            data: [],
            borderColor: '#2f6f9f',
            backgroundColor: 'rgba(47, 111, 159, 0.12)',
            tension: 0.36,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              boxWidth: 10,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(24, 34, 28, 0.08)' },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  function renderAlerts(alerts) {
    alertsList.innerHTML = '';

    if (!alerts.length) {
      const empty = document.createElement('div');
      empty.className = 'alert-card';
      empty.innerHTML = '<strong>No alerts yet</strong><p>The latest telemetry is within safe thresholds.</p>';
      alertsList.appendChild(empty);
      return;
    }

    alerts.forEach((alert) => {
      const card = document.createElement('article');
      card.className = `alert-card ${alert.severity === 'high' ? 'high' : ''}`;

      const title = document.createElement('strong');
      title.textContent = alert.alert_type === 'irrigation' ? 'Irrigation alert' : 'Sensor alert';

      const copy = document.createElement('p');
      copy.textContent = alert.message;

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = '';

      const device = document.createElement('span');
      device.textContent = `${alert.device_id} · ${alert.farm_name}`;

      const channel = document.createElement('span');
      channel.textContent = `${alert.channel.toUpperCase()} · ${alert.created_at}`;

      meta.append(device, channel);
      card.append(title, copy, meta);
      alertsList.appendChild(card);
    });
  }

  function updateMetricText(data) {
    const current = data.current;
    const device = data.device;

    farmerValue.textContent = device.farmer_name;
    farmValue.textContent = device.farm_name;
    readingValue.textContent = current
      ? `${formatValue(current.soil_moisture, '%')} moisture · ${formatValue(current.temperature, '°C')}`
      : '—';
    readingTime.textContent = current ? `Recorded at ${current.recorded_at}` : '—';

    alertCount.textContent = String(data.alerts.length);

    if (thresholdInput.dataset.custom !== 'true') {
      thresholdInput.value = device.moisture_threshold;
    }

    const irrigationNeeded = data.recommendations.irrigation_needed;
    irrigationStatus.textContent = irrigationNeeded ? 'Irrigation needed' : 'Moisture healthy';
    irrigationStatus.classList.toggle('warn', irrigationNeeded);
    recommendationText.textContent = irrigationNeeded
      ? `Moisture has dropped below ${formatValue(device.moisture_threshold, '%')}. Queue irrigation now.`
      : data.recommendations.fertilizer_hint;
  }

  function updateCharts(data) {
    const current = data.current || {};
    const threshold = Number(thresholdInput.value) || 32;
    const moistureValue = clamp(Number(current.soil_moisture) || 0, 0, 100);
    const temperatureValue = clamp(Number(current.temperature) || 0, 0, 100);
    const humidityValue = clamp(Number(current.humidity) || 0, 0, 100);

    moistureGauge.data.datasets[0].data = [moistureValue, 100 - moistureValue];
    moistureGauge.data.datasets[0].backgroundColor[0] = moistureValue < threshold ? '#bf3d24' : '#226b47';
    moistureGauge.update();

    temperatureGauge.data.datasets[0].data = [temperatureValue, 100 - temperatureValue];
    temperatureGauge.data.datasets[0].backgroundColor[0] = '#b67a17';
    temperatureGauge.update();

    humidityGauge.data.datasets[0].data = [humidityValue, 100 - humidityValue];
    humidityGauge.data.datasets[0].backgroundColor[0] = '#2f6f9f';
    humidityGauge.update();

    const labels = data.history.map((point) => point.recorded_at.slice(11, 16));
    historyChart.data.labels = labels;
    historyChart.data.datasets[0].data = data.history.map((point) => point.soil_moisture);
    historyChart.data.datasets[1].data = data.history.map((point) => point.temperature);
    historyChart.data.datasets[2].data = data.history.map((point) => point.humidity);
    historyChart.update();
  }

  async function loadDevices() {
    const response = await fetch(`${API_BASE}/api/iot/devices`);
    if (!response.ok) {
      throw new Error(`Device lookup failed with status ${response.status}`);
    }

    const payload = await response.json();
    const devices = payload.devices || [];

    deviceSelect.innerHTML = '';
    devices.forEach((device) => {
      const option = document.createElement('option');
      option.value = device.device_id;
      option.textContent = `${device.device_id} · ${device.farm_name}`;
      deviceSelect.appendChild(option);
    });

    return devices;
  }

  async function refreshDashboard() {
    try {
      setSyncState('Refreshing telemetry…');
      const deviceId = deviceSelect.value;
      const response = await fetch(`${API_BASE}/api/iot/dashboard?device_id=${encodeURIComponent(deviceId)}`);
      if (!response.ok) {
        throw new Error(`Dashboard lookup failed with status ${response.status}`);
      }

      const payload = await response.json();
      updateMetricText(payload);
      updateCharts(payload);
      renderAlerts(payload.alerts);
      setSyncState(`Synced at ${new Date().toLocaleTimeString()}`, 'success');
    } catch (error) {
      console.error(error);
      setSyncState('Unable to load telemetry. Start the backend API.', 'error');
    }
  }

  async function boot() {
    moistureGauge = buildGauge(moistureCanvas, 'Moisture', '#226b47');
    temperatureGauge = buildGauge(temperatureCanvas, 'Temperature', '#b67a17');
    humidityGauge = buildGauge(humidityCanvas, 'Humidity', '#2f6f9f');
    historyChart = buildHistoryChart();

    await loadDevices();
    await refreshDashboard();
  }

  deviceSelect.addEventListener('change', () => {
    thresholdInput.dataset.custom = '';
    refreshDashboard();
  });
  thresholdInput.addEventListener('input', () => {
    thresholdInput.dataset.custom = 'true';
  });
  thresholdInput.addEventListener('change', refreshDashboard);
  refreshBtn.addEventListener('click', refreshDashboard);

  boot();
  window.setInterval(refreshDashboard, pollIntervalMs);
})();