(function () {
  const API_BASE = window.__EQUIPMENT_API_BASE__ || 'http://127.0.0.1:5000';

  const listingForm = document.getElementById('listingForm');
  const listingStatus = document.getElementById('listingStatus');
  const photoInput = listingForm ? listingForm.querySelector('input[name="photo"]') : null;
  const photoPreview = document.getElementById('photoPreview');
  const searchInput = document.getElementById('searchInput');
  const pinInput = document.getElementById('pinInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultMeta = document.getElementById('resultMeta');
  const marketplaceGrid = document.getElementById('marketplaceGrid');

  if (!listingForm || !photoInput || !photoPreview || !searchInput || !pinInput || !searchBtn || !marketplaceGrid) {
    return;
  }

  let allEquipment = [];

  function setListingStatus(message, tone = 'neutral') {
    if (!listingStatus) return;
    listingStatus.textContent = message;
    listingStatus.dataset.tone = tone;
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value) || 0);
  }

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function showPreview(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { photoPreview.src = String(reader.result || photoPreview.src); };
    reader.readAsDataURL(file);
  }

  function cardMarkup(equipment) {
    const card = document.createElement('article');
    card.className = 'listing-card';

    const image = document.createElement('img');
    image.src = equipment.photo_data_url || photoPreview.src;
    image.alt = equipment.name;

    const body = document.createElement('div');
    body.className = 'listing-body';

    const top = document.createElement('div');
    top.className = 'listing-top';

    const heading = document.createElement('div');
    const name = document.createElement('h3');
    name.textContent = equipment.name;
    const owner = document.createElement('p');
    owner.className = 'listing-meta';
    owner.textContent = `${equipment.owner_name} · ID ${equipment.owner_id}`;
    heading.append(name, owner);

    const rate = document.createElement('span');
    rate.className = 'pill';
    rate.textContent = formatCurrency(equipment.daily_rate) + '/day';
    top.append(heading, rate);

    const description = document.createElement('p');
    description.textContent = equipment.description;

    const meta = document.createElement('div');
    meta.className = 'listing-meta';
    meta.innerHTML = '';
    const pin = document.createElement('span');
    pin.textContent = `Pin ${equipment.pin_code}`;
    const status = document.createElement('span');
    status.textContent = equipment.status;
    meta.append(pin, status);

    const actions = document.createElement('div');
    actions.className = 'listing-actions';

    const detailLink = document.createElement('a');
    detailLink.href = `equipment-detail.html?equipment_id=${equipment.id}`;
    detailLink.textContent = 'View & book';

    const quickTag = document.createElement('button');
    quickTag.type = 'button';
    quickTag.textContent = 'Nearby match';
    quickTag.addEventListener('click', () => {
      pinInput.value = equipment.pin_code;
      searchMarketplace();
    });

    actions.append(detailLink, quickTag);
    body.append(top, description, meta, actions);
    card.append(image, body);
    return card;
  }

  function renderMarketplace(items) {
    marketplaceGrid.innerHTML = '';

    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'booking-list-card';
      empty.textContent = 'No available equipment matches the current search.';
      marketplaceGrid.appendChild(empty);
      if (resultMeta) resultMeta.textContent = '0 listings found';
      return;
    }

    items.forEach((equipment) => marketplaceGrid.appendChild(cardMarkup(equipment)));
    if (resultMeta) resultMeta.textContent = `${items.length} available listing${items.length === 1 ? '' : 's'} found`;
  }

  async function loadMarketplace() {
    const params = new URLSearchParams();
    const query = searchInput.value.trim();
    const pin = pinInput.value.trim();
    if (query) params.set('q', query);
    if (pin) params.set('pin_code', pin);
    params.set('status', 'available');

    const response = await fetch(`${API_BASE}/api/equipment/listings?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Marketplace request failed with status ${response.status}`);
    }

    const payload = await response.json();
    allEquipment = payload.equipment || [];
    renderMarketplace(allEquipment);
  }

  async function searchMarketplace() {
    try {
      await loadMarketplace();
    } catch (error) {
      console.error(error);
      if (resultMeta) resultMeta.textContent = 'Unable to load the marketplace right now.';
    }
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Unable to read the selected file.'));
      reader.readAsDataURL(file);
    });
  }

  listingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(listingForm);
    const photoFile = photoInput.files && photoInput.files[0];

    try {
      setListingStatus('Publishing listing…');
      const payload = {
        name: formData.get('name'),
        description: formData.get('description'),
        daily_rate: Number(formData.get('daily_rate')),
        owner_id: formData.get('owner_id'),
        owner_name: formData.get('owner_name'),
        pin_code: formData.get('pin_code'),
        status: formData.get('status') || 'available',
      };

      if (photoFile) {
        payload.photo_data_url = await fileToDataUrl(photoFile);
      }

      const response = await fetch(`${API_BASE}/api/equipment/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload.error || `Listing request failed (${response.status})`);
      }

      listingForm.reset();
      photoPreview.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 800 500%27%3E%3Crect width=%27800%27 height=%27500%27 rx=%2736%27 fill=%27%23226b47%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 fill=%27white%27 font-family=%27Manrope, Arial, sans-serif%27 font-size=%2732%27 font-weight=%27800%27%3EUpload a photo preview%3C/text%3E%3C/svg%3E';
      setListingStatus('Equipment listed successfully.', 'success');
      await searchMarketplace();
    } catch (error) {
      console.error(error);
      setListingStatus(error.message || 'Unable to publish listing.', 'error');
    }
  });

  photoInput.addEventListener('change', () => showPreview(photoInput.files && photoInput.files[0]));
  searchBtn.addEventListener('click', searchMarketplace);
  searchInput.addEventListener('input', () => window.clearTimeout(window.__equipmentSearchTimer));
  pinInput.addEventListener('input', () => window.clearTimeout(window.__equipmentSearchTimer));

  const scheduleSearch = () => {
    window.clearTimeout(window.__equipmentSearchTimer);
    window.__equipmentSearchTimer = window.setTimeout(searchMarketplace, 250);
  };

  searchInput.addEventListener('input', scheduleSearch);
  pinInput.addEventListener('input', scheduleSearch);

  searchMarketplace();
})();