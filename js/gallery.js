/* ============================================================
   GALLERY.JS — 3D tilt gallery cards + fullscreen viewer
   ============================================================ */

const GallerySystem = (() => {
  'use strict';

  /* ── Gallery data — used for fullscreen viewer ──────────── */
  // Each item maps to .gallery-item by index
  // title/sub pulled from .gallery-overlay-title / .gallery-overlay-sub

  let items       = [];
  let currentIdx  = 0;
  let viewerOpen  = false;

  /* ── Fullscreen viewer elements ─────────────────────────── */
  let viewer, viewerImg, viewerClose, viewerPrev, viewerNext, viewerCounter;

  /* ── Build gallery item data ────────────────────────────── */
  function buildData() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    items = Array.from(galleryItems).map(el => {
      const img    = el.querySelector('.gallery-img');
      const ph     = el.querySelector('.gallery-img-placeholder');
      const title  = el.querySelector('.gallery-overlay-title')?.textContent || '';
      const sub    = el.querySelector('.gallery-overlay-sub')?.textContent   || '';
      return {
        el,
        src   : img ? img.src : null,
        gradient: ph ? ph.style.background : null,
        title,
        sub,
      };
    });
  }

  /* ── Open viewer ────────────────────────────────────────── */
  function openViewer(idx) {
    if (!viewer) return;
    currentIdx = idx;
    const item = items[currentIdx];
    if (!item) return;

    if (item.src) {
      viewerImg.src = item.src;
    } else {
      // no real image — show styled placeholder
      viewerImg.src = '';
      viewerImg.style.background = item.gradient || 'var(--clr-bg)';
      viewerImg.style.width      = '600px';
      viewerImg.style.height     = '400px';
    }

    updateCounter();
    viewer.classList.add('open');
    document.body.style.overflow = 'hidden';
    viewerOpen = true;

    // trap focus
    setTimeout(() => viewerClose.focus(), 300);
  }

  function closeViewer() {
    if (!viewer) return;
    viewer.classList.remove('open');
    document.body.style.overflow = '';
    viewerOpen = false;
    viewerImg.style.background = '';
    viewerImg.style.width      = '';
    viewerImg.style.height     = '';
  }

  function prevItem() {
    currentIdx = (currentIdx - 1 + items.length) % items.length;
    navigateTo(currentIdx);
  }

  function nextItem() {
    currentIdx = (currentIdx + 1) % items.length;
    navigateTo(currentIdx);
  }

  function navigateTo(idx) {
    currentIdx = idx;
    const item = items[idx];
    if (!item) return;

    // brief fade
    viewerImg.style.opacity = '0';
    viewerImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
      if (item.src) {
        viewerImg.src = item.src;
      } else {
        viewerImg.src = '';
        viewerImg.style.background = item.gradient || 'var(--clr-bg)';
        viewerImg.style.width      = '600px';
        viewerImg.style.height     = '400px';
      }
      viewerImg.style.opacity   = '1';
      viewerImg.style.transform = 'scale(1)';
      updateCounter();
    }, 180);
  }

  function updateCounter() {
    if (viewerCounter) {
      viewerCounter.textContent = `${String(currentIdx + 1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
    }
  }

  /* ── Keyboard navigation ────────────────────────────────── */
  function onKeydown(e) {
    if (!viewerOpen) return;
    if (e.key === 'Escape')     closeViewer();
    if (e.key === 'ArrowLeft')  prevItem();
    if (e.key === 'ArrowRight') nextItem();
  }

  /* ── Gallery item click ─────────────────────────────────── */
  function bindGalleryItems() {
    items.forEach((item, idx) => {
      item.el.addEventListener('click', () => openViewer(idx));
      item.el.setAttribute('tabindex', '0');
      item.el.setAttribute('role', 'button');
      item.el.setAttribute('aria-label', `View: ${item.title}`);
      item.el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openViewer(idx);
        }
      });
    });
  }

  /* ── Touch swipe on viewer ──────────────────────────────── */
  function bindViewerSwipe() {
    if (!viewer) return;
    let touchStartX = 0;

    viewer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    viewer.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        dx > 0 ? prevItem() : nextItem();
      }
    }, { passive: true });
  }

  /* ── Masonry float effect (subtle) ─────────────────────── */
  function initMasonryFloat() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((el, i) => {
      const delay = i * 0.12;
      const dur   = 5 + (i % 3) * 1.5;
      const amp   = 8 + (i % 4) * 3;
      el.style.animation = `camera-float ${dur}s ease-in-out ${delay}s infinite`;
      el.style.setProperty('--float-amp', amp + 'px');
    });
  }

  /* ── Init viewer elements ───────────────────────────────── */
  function initViewer() {
    viewer        = document.getElementById('img-viewer');
    if (!viewer) return;

    viewerImg     = viewer.querySelector('img');
    viewerClose   = viewer.querySelector('.viewer-close');
    viewerPrev    = viewer.querySelector('.viewer-arrow--prev');
    viewerNext    = viewer.querySelector('.viewer-arrow--next');
    viewerCounter = viewer.querySelector('.viewer-counter');

    if (!viewerImg) {
      // create img element
      viewerImg = document.createElement('img');
      viewerImg.alt = 'Gallery photo';
      viewerImg.style.transition = 'opacity .2s, transform .2s';
      viewer.insertBefore(viewerImg, viewer.firstChild);
    }

    if (viewerClose) viewerClose.addEventListener('click', closeViewer);
    if (viewerPrev)  viewerPrev.addEventListener('click', prevItem);
    if (viewerNext)  viewerNext.addEventListener('click', nextItem);

    // close on backdrop click
    viewer.addEventListener('click', e => {
      if (e.target === viewer) closeViewer();
    });
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    initViewer();
    buildData();
    bindGalleryItems();
    bindViewerSwipe();

    document.addEventListener('keydown', onKeydown);
  }

  return { init };
})();
