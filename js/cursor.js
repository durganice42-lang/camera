/* ============================================================
   CURSOR.JS — Custom futuristic cursor + magnetic buttons
   ============================================================ */

const CursorSystem = (() => {
  'use strict';

  /* ── State ─────────────────────────────────────────────── */
  let mouse    = { x: window.innerWidth  / 2, y: window.innerHeight / 2 };
  let pos      = { x: window.innerWidth  / 2, y: window.innerHeight / 2 };
  let ringPos  = { x: window.innerWidth  / 2, y: window.innerHeight / 2 };
  let raf      = null;
  let isTouch  = false;
  let enabled  = true;

  const DOT_SPEED  = 1.0;   // dot follows instantly
  const RING_SPEED = 0.12;  // ring lags behind — smooth trailing

  /* ── Elements ──────────────────────────────────────────── */
  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');

  /* ── Touch detection ───────────────────────────────────── */
  function checkTouch() {
    isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) {
      if (dot)   dot.style.display   = 'none';
      if (ring)  ring.style.display  = 'none';
      if (label) label.style.display = 'none';
      enabled = false;
    }
  }

  /* ── Mouse tracking ────────────────────────────────────── */
  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  /* ── Animation loop ────────────────────────────────────── */
  function tick() {
    if (!enabled) return;

    // dot: instant
    pos.x += (mouse.x - pos.x) * DOT_SPEED;
    pos.y += (mouse.y - pos.y) * DOT_SPEED;

    // ring: smooth lag
    ringPos.x += (mouse.x - ringPos.x) * RING_SPEED;
    ringPos.y += (mouse.y - ringPos.y) * RING_SPEED;

    if (dot) {
      dot.style.transform = `translate(${pos.x - 4}px, ${pos.y - 4}px)`;
    }
    if (ring) {
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
    }
    if (label) {
      label.style.transform = `translate(${mouse.x + 18}px, ${mouse.y + 18}px)`;
    }

    raf = requestAnimationFrame(tick);
  }

  /* ── Cursor state management ───────────────────────────── */
  const STATE_MAP = {
    '[data-cursor="cam"]'    : 'cursor-hover-cam',
    '[data-cursor="explore"]': 'cursor-hover-cam',
    'a, button, .btn-cta, .btn-hero, .feature-item, .hamburger': 'cursor-hover-link',
    '.gallery-item'          : 'cursor-hover-img',
    '.magnetic'              : 'cursor-hover-btn',
  };

  const LABEL_MAP = {
    'cursor-hover-cam' : 'EXPLORE',
    'cursor-hover-img' : 'VIEW',
    'cursor-hover-btn' : '',
    'cursor-hover-link': '',
  };

  function clearState() {
    document.body.classList.remove(
      'cursor-hover-cam', 'cursor-hover-link',
      'cursor-hover-btn', 'cursor-hover-img'
    );
    if (label) label.textContent = '';
  }

  function bindHoverStates() {
    Object.entries(STATE_MAP).forEach(([selector, stateClass]) => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => {
          clearState();
          document.body.classList.add(stateClass);
          if (label && LABEL_MAP[stateClass]) {
            label.textContent = LABEL_MAP[stateClass];
          }
        });
        el.addEventListener('mouseleave', clearState);
      });
    });
  }

  /* Re-bind after dynamic content loads */
  function rebind() {
    if (!enabled) return;
    bindHoverStates();
    bindMagnetic();
  }

  /* ── Magnetic buttons ──────────────────────────────────── */
  function bindMagnetic() {
    document.querySelectorAll('.magnetic').forEach(el => {
      const inner    = el.querySelector('.magnetic-inner') || el;
      const strength = parseFloat(el.dataset.magnetStrength || '0.3');

      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) * strength;
        const dy   = (e.clientY - cy) * strength;

        // move only the inner span — keeps the outer button outline fixed
        inner.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
      });

      el.addEventListener('mouseleave', () => {
        inner.style.transform = '';
      });
    });
  }

  /* ── Click ripple ──────────────────────────────────────── */
  function onMouseDown() {
    if (!dot) return;
    dot.style.transform += ' scale(0.7)';
    setTimeout(() => { dot.style.transform = dot.style.transform.replace(' scale(0.7)', ''); }, 120);
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    checkTouch();
    if (!enabled) return;

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);

    bindHoverStates();
    bindMagnetic();

    // hide default cursor
    document.body.style.cursor = 'none';

    tick();
  }

  return { init, rebind };
})();
