(function () {
  const API_BASE = window.__EQUIPMENT_API_BASE__ || 'http://127.0.0.1:5000';
  const equipmentId = new URLSearchParams(window.location.search).get('equipment_id');

  const detailHero = document.getElementById('detailHero');
  const bookingForm = document.getElementById('bookingForm');
  const bookingStatus = document.getElementById('bookingStatus');
  const bookingList = document.getElementById('bookingList');
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const dailyRateText = document.getElementById('dailyRateText');
  const rentalDaysText = document.getElementById('rentalDaysText');
  const totalCostText = document.getElementById('totalCostText');

  if (!detailHero || !bookingForm || !bookingStatus || !bookingList || !startDateInput || !endDateInput) {
    return;
  }

  let currentEquipment = null;
  let startPicker = null;
  let endPicker = null;

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value) || 0);
  }

  function calcDays() {
    if (!startDateInput.value || !endDateInput.value) return 0;
    const start = new Date(startDateInput.value);
    const end = new Date(endDateInput.value);
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff + 1 : 0;
  }

  function updateCost() {
    if (!currentEquipment) return;
    const days = calcDays();
    const total = days > 0 ? days * Number(currentEquipment.daily_rate) : 0;
    rentalDaysText.textContent = String(days);
    totalCostText.textContent = formatCurrency(total);
    dailyRateText.textContent = formatCurrency(currentEquipment.daily_rate) + '/day';
  }

  function renderBookings(bookings) {
    bookingList.innerHTML = '';

    if (!bookings.length) {
      const empty = document.createElement('div');
      empty.className = 'booking-list-card';
      empty.textContent = 'No existing bookings yet.';
      bookingList.appendChild(empty);
      return;
    }

    bookings.forEach((booking) => {
      const card = document.createElement('article');
      card.className = 'booking-list-card';

      const heading = document.createElement('strong');
      heading.textContent = `${booking.start_date} → ${booking.end_date}`;

      const details = document.createElement('p');
      details.textContent = `${booking.renter_name} · ${formatCurrency(booking.total_cost)}`;

      card.append(heading, details);
      bookingList.appendChild(card);
    });
  }

  function setDisabledRanges(bookings) {
    const ranges = bookings.map((booking) => ({ from: booking.start_date, to: booking.end_date }));
    const common = {
      dateFormat: 'Y-m-d',
      minDate: 'today',
      disable: ranges,
      allowInput: true,
    };

    if (startPicker) startPicker.destroy();
    if (endPicker) endPicker.destroy();

    startPicker = flatpickr(startDateInput, {
      ...common,
      onChange: (_, dateStr) => {
        if (dateStr) endPicker.set('minDate', dateStr);
        updateCost();
      },
    });

    endPicker = flatpickr(endDateInput, {
      ...common,
      onChange: updateCost,
    });
  }

  function renderHero(equipment) {
    const hero = document.createElement('div');
    hero.className = 'equipment-hero-card';

    const image = document.createElement('img');
    image.src = equipment.photo_data_url;
    image.alt = equipment.name;

    const copy = document.createElement('div');
    copy.className = 'equipment-copy';

    const eyebrow = document.createElement('span');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = `${equipment.status.toUpperCase()} · ${equipment.pin_code}`;

    const title = document.createElement('h1');
    title.textContent = equipment.name;

    const desc = document.createElement('p');
    desc.textContent = equipment.description;

    const specGrid = document.createElement('div');
    specGrid.className = 'spec-grid';

    const specs = [
      ['Owner', `${equipment.owner_name} · ${equipment.owner_id}`],
      ['Daily rate', formatCurrency(equipment.daily_rate)],
      ['Nearby pin', equipment.pin_code],
      ['Status', equipment.status],
    ];

    specs.forEach(([label, value]) => {
      const card = document.createElement('div');
      card.className = 'spec-card';
      const labelEl = document.createElement('span');
      labelEl.textContent = label;
      const valueEl = document.createElement('strong');
      valueEl.textContent = value;
      card.append(labelEl, valueEl);
      specGrid.appendChild(card);
    });

    copy.append(eyebrow, title, desc, specGrid);
    hero.append(image, copy);
    detailHero.innerHTML = '';
    detailHero.appendChild(hero);
  }

  async function loadEquipment() {
    if (!equipmentId) {
      detailHero.innerHTML = '<p class="loading-state">No equipment_id was provided in the URL.</p>';
      return;
    }

    const response = await fetch(`${API_BASE}/api/equipment/${encodeURIComponent(equipmentId)}`);
    if (!response.ok) {
      throw new Error(`Equipment lookup failed with status ${response.status}`);
    }

    const equipment = await response.json();
    currentEquipment = equipment;
    renderHero(equipment);
    renderBookings(equipment.bookings || []);
    setDisabledRanges(equipment.bookings || []);
    updateCost();
  }

  async function submitBooking(event) {
    event.preventDefault();

    if (!currentEquipment) return;

    try {
      bookingStatus.textContent = 'Submitting booking…';
      const payload = {
        equipment_id: currentEquipment.id,
        renter_id: bookingForm.renter_id.value.trim(),
        renter_name: bookingForm.renter_name.value.trim(),
        start_date: startDateInput.value,
        end_date: endDateInput.value,
      };

      const response = await fetch(`${API_BASE}/api/equipment/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || `Booking failed (${response.status})`);
      }

      bookingStatus.textContent = `Booking confirmed. Total cost ${formatCurrency(result.total_cost)}.`;
      bookingForm.reset();
      if (startPicker) startPicker.clear();
      if (endPicker) endPicker.clear();
      await loadEquipment();
      updateCost();
    } catch (error) {
      console.error(error);
      bookingStatus.textContent = error.message || 'Unable to confirm booking.';
    }
  }

  bookingForm.addEventListener('submit', submitBooking);

  startDateInput.addEventListener('change', updateCost);
  endDateInput.addEventListener('change', updateCost);

  loadEquipment().catch((error) => {
    console.error(error);
    detailHero.innerHTML = '<p class="loading-state">Unable to load equipment details.</p>';
  });
})();