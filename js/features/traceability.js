(function () {
  const API_BASE = window.location.origin && window.location.origin.startsWith('http')
    ? window.location.origin
    : 'http://127.0.0.1:5000';

  const selectEl = document.getElementById('batch-select');
  const inputEl = document.getElementById('batch-id-input');
  const generateBtn = document.getElementById('generate-btn');
  const summaryEl = document.getElementById('batch-summary');
  const qrEl = document.getElementById('qr-code');
  const traceUrlEl = document.getElementById('trace-url');

  let qrInstance = null;
  let batches = [];

  function buildVerifyUrl(batchId) {
    const url = new URL('/verify-produce', API_BASE);
    url.searchParams.set('batch_id', String(batchId));
    return url.toString();
  }

  function renderSummary(batch) {
    summaryEl.innerHTML = '';

    const cards = [
      ['Batch code', batch.batch_code],
      ['Farmer', batch.farmer_name],
      ['Crop', batch.crop_name],
      ['Planting date', batch.planting_date],
      ['Harvest date', batch.harvest_date],
      ['Acreage', `${batch.acreage} acres`],
    ];

    cards.forEach(([label, value]) => {
      const card = document.createElement('div');
      card.className = 'batch-summary-card';

      const title = document.createElement('strong');
      title.textContent = label;

      const text = document.createElement('span');
      text.textContent = value;

      card.append(title, text);
      summaryEl.appendChild(card);
    });
  }

  function renderQr(batchId) {
    const targetUrl = buildVerifyUrl(batchId);
    qrEl.innerHTML = '';

    if (window.QRCode) {
      qrInstance = new QRCode(qrEl, {
        text: targetUrl,
        width: 240,
        height: 240,
        colorDark: '#18221c',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M,
      });
    } else {
      qrEl.textContent = targetUrl;
    }

    traceUrlEl.textContent = targetUrl;
  }

  function syncSelection(batchId) {
    const batch = batches.find((item) => String(item.id) === String(batchId));
    if (!batch) return;
    selectEl.value = String(batch.id);
    inputEl.value = String(batch.id);
    renderSummary(batch);
    renderQr(batch.id);
  }

  async function loadBatches() {
    try {
      const response = await fetch(`${API_BASE}/api/produce/batches`);
      if (!response.ok) {
        throw new Error(`Failed to load batches (${response.status})`);
      }

      const payload = await response.json();
      batches = payload.batches || [];

      selectEl.innerHTML = '';
      batches.forEach((batch) => {
        const option = document.createElement('option');
        option.value = String(batch.id);
        option.textContent = `${batch.batch_code} · ${batch.crop_name}`;
        selectEl.appendChild(option);
      });

      const initialBatchId = batches[0] ? batches[0].id : null;
      const urlBatchId = new URLSearchParams(window.location.search).get('batch_id');
      syncSelection(urlBatchId || initialBatchId);
    } catch (error) {
      console.error(error);
      summaryEl.textContent = 'Unable to load batches from the traceability API.';
    }
  }

  function handleGenerate() {
    const batchId = inputEl.value || selectEl.value;
    if (!batchId) return;
    syncSelection(batchId);
  }

  selectEl.addEventListener('change', () => {
    inputEl.value = selectEl.value;
    handleGenerate();
  });

  generateBtn.addEventListener('click', handleGenerate);

  if (inputEl) {
    inputEl.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleGenerate();
      }
    });
  }

  loadBatches();
})();