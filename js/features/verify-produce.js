(function () {
  const API_BASE = window.location.origin && window.location.origin.startsWith('http')
    ? window.location.origin
    : 'http://127.0.0.1:5000';

  const batchPanel = document.getElementById('batch-panel');
  const timelineEl = document.getElementById('timeline');

  function escapeText(value) {
    return String(value ?? '');
  }

  function renderBatchCard(batch) {
    batchPanel.innerHTML = '';

    const title = document.createElement('div');
    title.className = 'panel-heading';

    const heading = document.createElement('h2');
    heading.textContent = batch.batch_code;

    const copy = document.createElement('p');
    copy.textContent = `${batch.crop.name} · ${batch.crop.variety}`;

    title.append(heading, copy);

    const metaWrap = document.createElement('div');
    metaWrap.className = 'batch-meta';

    const grid = document.createElement('div');
    grid.className = 'meta-grid';

    const items = [
      ['Farmer', batch.farmer.name],
      ['Location', batch.farmer.location],
      ['Planting date', batch.planting_date],
      ['Harvest date', batch.harvest_date],
      ['Acreage', `${batch.acreage} acres`],
      ['Fertilizers', batch.fertilizer_summary],
    ];

    items.forEach(([label, value]) => {
      const card = document.createElement('div');
      card.className = 'meta-card';

      const labelEl = document.createElement('span');
      labelEl.textContent = label;

      const valueEl = document.createElement('strong');
      valueEl.textContent = escapeText(value);

      card.append(labelEl, valueEl);
      grid.appendChild(card);
    });

    metaWrap.append(title, grid);
    batchPanel.appendChild(metaWrap);
  }

  function renderTimeline(events) {
    timelineEl.innerHTML = '';

    events.forEach((event, index) => {
      const step = document.createElement('article');
      step.className = 'timeline-step';

      const marker = document.createElement('div');
      marker.className = 'timeline-marker';
      marker.textContent = String(index + 1);

      const card = document.createElement('div');
      card.className = 'timeline-card';

      const heading = document.createElement('h3');
      heading.textContent = event.event_type;

      const date = document.createElement('div');
      date.className = 'timeline-step__date';
      date.textContent = event.event_date;

      const copy = document.createElement('p');
      copy.className = 'timeline-copy';
      copy.textContent = event.details;

      const hash = document.createElement('div');
      hash.className = 'timeline-step__hash';
      hash.textContent = `Hash: ${event.event_hash}`;

      card.append(heading, date, copy, hash);
      step.append(marker, card);
      timelineEl.appendChild(step);
    });
  }

  function renderError(message) {
    batchPanel.innerHTML = '';
    timelineEl.innerHTML = '';

    const error = document.createElement('div');
    error.className = 'error-state';
    error.textContent = message;
    batchPanel.appendChild(error);
  }

  async function loadBatch() {
    const batchId = new URLSearchParams(window.location.search).get('batch_id');

    if (!batchId) {
      renderError('No batch_id was provided in the verification URL.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/produce/batches/${batchId}`);
      if (!response.ok) {
        throw new Error(`Batch lookup failed (${response.status})`);
      }

      const payload = await response.json();
      renderBatchCard(payload.batch);
      renderTimeline(payload.events);
    } catch (error) {
      console.error(error);
      renderError('Unable to verify this batch. The ledger API returned no record for the provided batch ID.');
    }
  }

  loadBatch();
})();