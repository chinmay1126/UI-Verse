(function () {
  const API_BASE = window.__ROI_API_BASE__ || window.ROI_API_BASE || 'http://127.0.0.1:5000';
  const form = document.getElementById('roi-form');
  const statusEl = document.getElementById('status');
  const submitBtn = form.querySelector('.submit-btn');
  const yieldEl = document.getElementById('yield-value');
  const revenueEl = document.getElementById('revenue-value');
  const profitEl = document.getElementById('profit-value');
  const roiEl = document.getElementById('roi-value');
  const costEl = document.getElementById('cost-value');
  const gapEl = document.getElementById('gap-value');
  const priceEl = document.getElementById('price-value');
  const ctx = document.getElementById('roiChart');

  let roiChart = null;

  function toNumber(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(toNumber(value));
  }

  function formatTons(value) {
    return `${toNumber(value).toFixed(2)} tons`;
  }

  function setStatus(message, tone = 'neutral') {
    statusEl.textContent = message;
    statusEl.dataset.tone = tone;
  }

  function updateOutputs(payload, result) {
    yieldEl.textContent = formatTons(result.predicted_yield_tons);
    revenueEl.textContent = formatCurrency(result.projected_revenue);
    profitEl.textContent = formatCurrency(result.expected_profit);
    roiEl.textContent = `${toNumber(result.roi_percent).toFixed(1)}%`;
    costEl.textContent = formatCurrency(result.total_costs);
    gapEl.textContent = formatCurrency(result.budget_gap);
    priceEl.textContent = `${formatCurrency(result.crop_price_per_ton)} / ton`;

    const chartData = {
      labels: ['Seed Cost', 'Fertilizer Cost', 'Projected Revenue', 'Expected Profit'],
      datasets: [{
        label: 'USD',
        data: [payload.seed_cost, payload.fertilizer_cost, result.projected_revenue, result.expected_profit],
        borderRadius: 12,
        backgroundColor: ['#8fbc8f', '#3b7b65', '#f59e0b', '#215944'],
      }],
    };

    if (!window.Chart) {
      return;
    }

    if (roiChart) {
      roiChart.data = chartData;
      roiChart.update();
      return;
    }

    roiChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label(context) {
                return formatCurrency(context.raw);
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(29, 42, 36, 0.08)' },
            ticks: {
              callback(value) {
                return `$${value}`;
              },
            },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  async function submitForecast(event) {
    event.preventDefault();

    const payload = {
      acreage: toNumber(form.acreage.value),
      seed_cost: toNumber(form.seed_cost.value),
      fertilizer_cost: toNumber(form.fertilizer_cost.value),
      budget: toNumber(form.budget.value),
      soil_type: form.soil_type.value,
      target_crop: form.target_crop.value,
    };

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    setStatus('Running yield and ROI forecast...', 'neutral');

    try {
      const response = await fetch(`${API_BASE}/predict_roi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Forecast request failed with status ${response.status}`);
      }

      const result = await response.json();
      updateOutputs(payload, result);
      setStatus(`Forecast ready for ${form.target_crop.value} on ${payload.acreage} acres.`, 'success');
    } catch (error) {
      console.error(error);
      setStatus('Unable to reach the prediction API. Start the backend server and try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
    }
  }

  if (form) {
    form.addEventListener('submit', submitForecast);
    setStatus('Ready to forecast. Submit the form to generate the first projection.', 'neutral');
  }
})();