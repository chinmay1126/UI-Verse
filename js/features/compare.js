(function () {
  const MAX_COMPARE = 3;
  const STORAGE_KEY = 'uiVerseCompare.selectedComponentIds.v1';

  const CARD_SELECTOR = '.component-card';
  const CARD_ID_ATTR = 'data-compare-id';

  const OVERLAY_ID = 'uiverse-compare-overlay';
  const OVERLAY_GRID_ID = 'uiverse-compare-grid';

  let state = {
    selectedIds: [],
    overlayOpen: false,
  };

  let cardsObserver = null;
  let reconcileQueued = false;
  let pendingActiveCell = undefined;
  let syncRetryQueued = false;
  let keyDownBound = false;
  let cachedCards = [];
  let cachedCheckboxInputs = [];
  let cachedOverlayGrid = null;
  let cachedCompareCells = new Map();

  function getCardElements() {
    return Array.from(document.querySelectorAll(CARD_SELECTOR));
  }

  function rebuildCompareCaches(cards = getCardElements()) {
    cachedCards = cards;
    cachedCheckboxInputs = Array.from(document.querySelectorAll('.uiverse-compare-checkbox'));
    cachedOverlayGrid = document.getElementById(OVERLAY_GRID_ID);
  }

  function loadSelectionFromStorage(storage = sessionStorage) {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, MAX_COMPARE).filter((x) => typeof x === 'string' && x.length > 0);
    } catch (e) {
      return [];
    }
  }

  function persistSelectionToStorage(selectedIds, storage = sessionStorage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
    } catch (e) {
      // ignore
    }
  }

  function toggleSelected(selectedIds, compareId, max = MAX_COMPARE) {
    if (!compareId) return selectedIds.slice();

    if (selectedIds.includes(compareId)) {
      return selectedIds.filter((id) => id !== compareId);
    }

    if (selectedIds.length >= max) {
      return selectedIds.slice();
    }

    return [...selectedIds, compareId];
  }

  function getSelectedCardsById(cards, ids, resolveId) {
    if (!Array.isArray(cards) || !Array.isArray(ids) || !ids.length) return [];
    const byId = new Map();

    cards.forEach((cardEl) => {
      const id = resolveId(cardEl);
      if (id) byId.set(id, cardEl);
    });

    return ids.map((id) => byId.get(id)).filter(Boolean);
  }

  function renderCompareCell(cardEl, onActivate) {
    const cell = document.createElement('div');
    cell.className = 'uiverse-compare-cell';
    cell.tabIndex = 0;
    cell.setAttribute('aria-current', 'false');

    const label = document.createElement('div');
    label.className = 'uiverse-compare-cell-label';

    const name = cardEl.getAttribute('data-name') || '';
    const cat = cardEl.getAttribute('data-cat') || '';
    label.textContent = `${name}${cat ? ' · ' + cat : ''}`;

    const preview = cardEl.querySelector('.card-preview');

    const previewWrap = document.createElement('div');
    previewWrap.className = 'uiverse-compare-cell-preview';

    // Clone ONLY preview area if possible
    if (preview) {
      previewWrap.appendChild(preview.cloneNode(true));
    } else {
      // fallback: clone whole card
      previewWrap.appendChild(cardEl.cloneNode(true));
      // remove checkbox from clone if present
      const cloned = previewWrap.querySelector('.uiverse-compare-checkbox-wrap');
      if (cloned) cloned.remove();
    }

    cell.appendChild(label);
    cell.appendChild(previewWrap);

    if (typeof onActivate === 'function') {
      cell.addEventListener('mouseenter', () => onActivate(cell));
      cell.addEventListener('focus', () => onActivate(cell));
      cell.addEventListener('focusin', () => onActivate(cell));
    }

    return cell;
  }

  function buildCompareCellSignature(cardEl) {
    if (!cardEl) return '';

    const name = cardEl.getAttribute('data-name') || '';
    const cat = cardEl.getAttribute('data-cat') || '';
    const preview = cardEl.querySelector('.card-preview');
    const contentSignature = preview ? preview.outerHTML : cardEl.outerHTML;

    return `${name}::${cat}::${contentSignature}`;
  }

  function ensureCompareCell(compareId, cardEl, onActivate) {
    if (!compareId || !cardEl) return null;

    const nextSignature = buildCompareCellSignature(cardEl);
    const cachedEntry = cachedCompareCells.get(compareId);

    if (cachedEntry && cachedEntry.cell && cachedEntry.cell.isConnected && cachedEntry.signature === nextSignature) {
      cachedEntry.sourceCardEl = cardEl;
      return cachedEntry.cell;
    }

    const cell = renderCompareCell(cardEl, onActivate);
    cachedCompareCells.set(compareId, {
      cell,
      signature: nextSignature,
      sourceCardEl: cardEl,
    });

    return cell;
  }

  function renderOverlayGrid(gridEl, selectedCards, onActivate) {
    if (!gridEl) return;

    const nextIds = [];

    selectedCards.slice(0, MAX_COMPARE).forEach((cardEl) => {
      const compareId = ensureCompareId(cardEl);
      if (!compareId) return;

      nextIds.push(compareId);
      const cell = ensureCompareCell(compareId, cardEl, onActivate);
      if (cell) {
        gridEl.appendChild(cell);
      }
    });

    for (const [compareId, entry] of cachedCompareCells.entries()) {
      if (nextIds.includes(compareId)) continue;
      if (entry && entry.cell && entry.cell.parentElement === gridEl) {
        gridEl.removeChild(entry.cell);
      }
    }

    cachedCompareCells.forEach((entry, compareId) => {
      if (nextIds.includes(compareId)) return;
      if (entry && entry.cell && !entry.cell.isConnected) {
        cachedCompareCells.delete(compareId);
      }
    });
  }

  function ensureCompareId(cardEl) {
    if (!cardEl || !(cardEl instanceof HTMLElement)) return null;
    if (cardEl.getAttribute(CARD_ID_ATTR)) return cardEl.getAttribute(CARD_ID_ATTR);

    // Prefer stable-ish identifier
    const name = (cardEl.getAttribute('data-name') || '').trim();
    const cat = (cardEl.getAttribute('data-cat') || '').trim();

    // Fallback: index within grid
    const all = cachedCards.length ? cachedCards : getCardElements();
    const idx = all.indexOf(cardEl);

    const metaKey = [name, cat].filter(Boolean).join('__');
    const raw = metaKey || `card__${idx}`;
    const safe = raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);

    // Keep metadata-backed IDs stable across DOM re-renders.
    const id = metaKey ? safe : `${safe}__${idx}`;

    cardEl.setAttribute(CARD_ID_ATTR, id);
    return id;
  }

  function createCheckbox(cardEl) {
    const checkboxWrap = document.createElement('div');
    checkboxWrap.className = 'uiverse-compare-checkbox-wrap';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'uiverse-compare-checkbox';
    input.setAttribute('aria-label', 'Select component for compare');

    const id = ensureCompareId(cardEl);
    if (id) input.dataset.compareId = id;

    input.checked = state.selectedIds.includes(id);
    if (!input.checked && state.selectedIds.length >= MAX_COMPARE) {
      input.disabled = true;
    }

    input.addEventListener('change', () => {
      const compareId = input.dataset.compareId;
      if (!compareId) return;

      const nextSelectedIds = toggleSelected(state.selectedIds, compareId);
      if (nextSelectedIds === state.selectedIds || nextSelectedIds.length === state.selectedIds.length && nextSelectedIds.every((id, index) => id === state.selectedIds[index])) {
        input.checked = state.selectedIds.includes(compareId);
        return;
      }

      state.selectedIds = nextSelectedIds;
      persistSelectionToStorage(state.selectedIds);
      refreshCheckboxStates();

      // open overlay automatically once we have at least 2 selections
      if (state.selectedIds.length >= 2) {
        openOverlay();
      } else {
        closeOverlayKeepSelection();
      }
    });

    checkboxWrap.appendChild(input);
    cardEl.appendChild(checkboxWrap);
  }

  function refreshCheckboxStates() {
    const inputs = cachedCheckboxInputs.length ? cachedCheckboxInputs : Array.from(document.querySelectorAll('.uiverse-compare-checkbox'));
    if (!cachedCheckboxInputs.length && inputs.length) cachedCheckboxInputs = inputs;

    // sync selected -> inputs
    inputs.forEach((input) => {
      const id = input.dataset.compareId;
      input.checked = state.selectedIds.includes(id);
    });

    // enforce max=3
    inputs.forEach((input) => {
      const id = input.dataset.compareId;
      const isSelected = state.selectedIds.includes(id);
      input.disabled = !isSelected && state.selectedIds.length >= MAX_COMPARE;
    });
  }

  function buildPreviewCell(cardEl) {
    return renderCompareCell(cardEl, syncActive);
  }

  function syncActive(activeCell) {
    const grid = cachedOverlayGrid || document.getElementById(OVERLAY_GRID_ID);
    if (!grid) {
      pendingActiveCell = activeCell;
      if (!syncRetryQueued) {
        syncRetryQueued = true;
        const retry = () => {
          syncRetryQueued = false;
          if (pendingActiveCell === undefined) return;
          const queuedCell = pendingActiveCell;
          pendingActiveCell = undefined;
          syncActive(queuedCell);
        };

        if (typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(retry);
        } else {
          setTimeout(retry, 0);
        }
      }
      return;
    }

    cachedOverlayGrid = grid;

    // Grid is available now; any queued state has been superseded.
    pendingActiveCell = undefined;

    const cells = Array.from(cachedCompareCells.values()).map((entry) => entry && entry.cell).filter(Boolean);
    const isActiveCell = (cell) => !!activeCell && cell === activeCell;

    cells.forEach((c) => {
      const active = isActiveCell(c);
      if (active) c.classList.add('uiverse-compare-cell--active');
      else c.classList.remove('uiverse-compare-cell--active');
      c.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function openOverlay() {
    const selectedCards = getSelectedCardsById(cachedCards.length ? cachedCards : getCardElements(), state.selectedIds, ensureCompareId);
    if (selectedCards.length < 2) return;

    let overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = OVERLAY_ID;
      overlay.className = 'uiverse-compare-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      overlay.innerHTML = `
        <div class="uiverse-compare-overlay__panel">
          <div class="uiverse-compare-overlay__header">
            <div class="uiverse-compare-overlay__title">
              Multi-Component Compare
              <span class="uiverse-compare-overlay__hint">(hover/focus sync)</span>
            </div>
            <div class="uiverse-compare-overlay__actions">
              <button type="button" class="uiverse-compare-clear" id="uiverse-compare-clear">Clear Compare</button>
              <button type="button" class="uiverse-compare-close" id="uiverse-compare-close">Close</button>
            </div>
          </div>
          <div class="uiverse-compare-overlay__body">
            <div class="uiverse-compare-grid" id="${OVERLAY_GRID_ID}"></div>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        if (e.target instanceof Element && !e.target.closest('.uiverse-compare-overlay__panel')) {
          closeOverlayKeepSelection();
        }
      });

      const clearBtn = document.getElementById('uiverse-compare-clear');
      const closeBtn = document.getElementById('uiverse-compare-close');

      clearBtn.addEventListener('click', () => closeOverlayClearSelection());

      closeBtn.addEventListener('click', () => closeOverlayKeepSelection());

      bindOverlayKeydown();
    }

    const grid = cachedOverlayGrid || document.getElementById(OVERLAY_GRID_ID);
    cachedOverlayGrid = grid;
    renderOverlayGrid(grid, selectedCards, syncActive);

    overlay.classList.add('uiverse-compare-overlay--open');
    state.overlayOpen = true;

    // initial active styling based on first cell
    const first = grid && grid.querySelector('.uiverse-compare-cell');
    if (first) {
      syncActive(first);
      if (typeof first.focus === 'function') {
        try {
          first.focus({ preventScroll: true });
        } catch {
          first.focus();
        }
      }
    }
  }

  function bindOverlayKeydown() {
    if (keyDownBound) return;
    document.addEventListener('keydown', onKeyDown);
    keyDownBound = true;
  }

  function unbindOverlayKeydown() {
    if (!keyDownBound) return;
    document.removeEventListener('keydown', onKeyDown);
    keyDownBound = false;
  }

  function closeOverlayKeepSelection() {
    unbindOverlayKeydown();
    const overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
      state.overlayOpen = false;
      cachedOverlayGrid = null;
      return;
    }
    syncActive(null);
    overlay.classList.remove('uiverse-compare-overlay--open');
    state.overlayOpen = false;
    cachedOverlayGrid = overlay.querySelector(`#${OVERLAY_GRID_ID}`);
  }

  function closeOverlayClearSelection() {
    state.selectedIds = [];
    persistSelectionToStorage(state.selectedIds);
    refreshCheckboxStates();
    closeOverlayKeepSelection();
  }

  function onKeyDown(e) {
    if (e.key !== 'Escape' || !state.overlayOpen) return;

    // Escape exits compare mode completely.
    e.preventDefault();
    closeOverlayClearSelection();
  }

  function maybeInit() {
    const cards = getCardElements();
    if (!cards.length) return;

    const restoredIds = loadSelectionFromStorage();

    // Keep only IDs that are present on this page load.
    const validIds = new Set(cards.map((card) => ensureCompareId(card)).filter(Boolean));
    state.selectedIds = restoredIds.filter((id) => validIds.has(id)).slice(0, MAX_COMPARE);
    persistSelectionToStorage(state.selectedIds);

    // Inject checkboxes once
    cards.forEach((card) => {
      if (card.querySelector('.uiverse-compare-checkbox-wrap')) return;
      createCheckbox(card);
    });

    rebuildCompareCaches(cards);

    for (const compareId of Array.from(cachedCompareCells.keys())) {
      if (!state.selectedIds.includes(compareId)) {
        cachedCompareCells.delete(compareId);
      }
    }

    refreshCheckboxStates();

    // Restore overlay open state when we have >=2 selections
    if (state.selectedIds.length >= 2) {
      openOverlay();
    }
  }

  function mutationTouchesCards(mutations) {
    const hasCard = (node) => {
      if (!(node instanceof Element)) return false;
      return node.matches(CARD_SELECTOR) || !!node.querySelector(CARD_SELECTOR);
    };

    return mutations.some((mutation) => {
      if (mutation.type !== 'childList') return false;
      return Array.from(mutation.addedNodes).some(hasCard) || Array.from(mutation.removedNodes).some(hasCard);
    });
  }

  function scheduleCardReconcile() {
    if (reconcileQueued) return;
    reconcileQueued = true;

    const run = () => {
      reconcileQueued = false;
      maybeInit();
    };

    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(run);
      return;
    }
    setTimeout(run, 0);
  }

  function observeDynamicCards() {
    if (cardsObserver || typeof MutationObserver === 'undefined' || !document.body) return;

    cardsObserver = new MutationObserver((mutations) => {
      if (!mutationTouchesCards(mutations)) return;
      scheduleCardReconcile();
    });

    cardsObserver.observe(document.body, { childList: true, subtree: true });
  }

  // Styles injected only when needed (so compare doesn't affect other pages too much)
  function injectStylesOnce() {
    if (document.getElementById('uiverse-compare-styles')) return;
    const link = document.createElement('link');
    link.id = 'uiverse-compare-styles';
    link.rel = 'stylesheet';

    const scriptSource = (() => {
      if (document.currentScript && document.currentScript.src) {
        return document.currentScript.src;
      }

      const scriptEl = document.querySelector('script[src*="js/features/compare.js"]');
      return scriptEl ? scriptEl.src : '';
    })();

    link.href = scriptSource
      ? new URL('../../compare.css', scriptSource).href
      : 'compare.css';

    document.head.appendChild(link);
  }

  // Only init on pages that contain cards
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStylesOnce();
      maybeInit();
      observeDynamicCards();
    });
  } else {
    injectStylesOnce();
    maybeInit();
    observeDynamicCards();
  }
})();

