/* ============================================================
   CAMERA-3D.JS — Cursor-based 3D camera tilt + parallax layers
   ============================================================ */

const Camera3D = (() => {
  'use strict';

  /* ── Config ────────────────────────────────────────────── */
  const CFG = {
    maxRotateX  :  12,    // degrees
    maxRotateY  :  16,
    maxTranslate:   8,    // px
    lerpSpeed   :  0.06,
    glowShift   :  30,    // px glow moves with cursor
    perspective :  900,
  };

  /* ── State ─────────────────────────────────────────────── */
  let mouse    = { x: 0, y: 0 };   // normalized -1…+1
  let current  = { rx: 0, ry: 0, tx: 0, ty: 0 };
  let target   = { rx: 0, ry: 0, tx: 0, ty: 0 };
  let raf      = null;
  let isTouch  = window.matchMedia('(hover: none)').matches;
  let isReduced= window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Elements ──────────────────────────────────────────── */
  let camEl, glowEl, flareEl, hudRings, parallaxLayers;

  /* ── Mouse → normalized ─────────────────────────────────── */
  function onMouseMove(e) {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    mouse.x  =  (e.clientX - cx) / cx;  // -1 → +1
    mouse.y  = -(e.clientY - cy) / cy;  // -1 → +1 (invert Y for natural feel)
  }

  /* ── RAF animation loop ─────────────────────────────────── */
  function tick() {
    target.rx = mouse.y * CFG.maxRotateX;
    target.ry = mouse.x * CFG.maxRotateY;
    target.tx = mouse.x * CFG.maxTranslate;
    target.ty = mouse.y * CFG.maxTranslate * 0.6;

    // lerp
    current.rx += (target.rx - current.rx) * CFG.lerpSpeed;
    current.ry += (target.ry - current.ry) * CFG.lerpSpeed;
    current.tx += (target.tx - current.tx) * CFG.lerpSpeed;
    current.ty += (target.ty - current.ty) * CFG.lerpSpeed;

    /* camera body */
    if (camEl) {
      camEl.style.transform =
        `perspective(${CFG.perspective}px) ` +
        `rotateX(${current.rx.toFixed(3)}deg) ` +
        `rotateY(${current.ry.toFixed(3)}deg) ` +
        `translate3d(${current.tx.toFixed(3)}px, ${(-current.ty).toFixed(3)}px, 0)`;
    }

    /* glow follows cursor offset */
    if (glowEl) {
      const gx = mouse.x * CFG.glowShift;
      const gy = -mouse.y * CFG.glowShift;
      glowEl.style.transform = `translate(${gx.toFixed(2)}px, ${gy.toFixed(2)}px) scale(1)`;
    }

    /* lens flare follows cursor */
    if (flareEl) {
      const fx = 30 + mouse.x * 20;
      const fy = 20 + mouse.y * -15;
      flareEl.style.left = fx + '%';
      flareEl.style.top  = fy + '%';
    }

    /* HUD rings — different parallax depths */
    if (hudRings && hudRings.length) {
      const depths = [0.025, 0.05, 0.012, 0.008];
      hudRings.forEach((ring, i) => {
        const d  = depths[i] || 0.02;
        const px = mouse.x * window.innerWidth  * d;
        const py = -mouse.y * window.innerHeight * d;
        // keep CSS rotation animation intact via CSS var, use margin as offset trick
        ring.style.marginLeft = px.toFixed(2) + 'px';
        ring.style.marginTop  = py.toFixed(2) + 'px';
      });
    }

    /* additional parallax layers */
    if (parallaxLayers && parallaxLayers.length) {
      parallaxLayers.forEach(layer => {
        const depth = parseFloat(layer.dataset.parallax || '0.03');
        const px    = mouse.x * window.innerWidth  * depth;
        const py    = -mouse.y * window.innerHeight * depth;
        layer.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;
      });
    }

    raf = requestAnimationFrame(tick);
  }

  /* ── Tech card 3D tilt ──────────────────────────────────── */
  function bindCardTilt() {
    document.querySelectorAll('.tech-card, .gallery-item').forEach(card => {
      const MAX = parseFloat(card.dataset.tilt || '12');

      card.addEventListener('mousemove', e => {
        const rect  = card.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const rx    = -(e.clientY - cy) / (rect.height / 2) * MAX;
        const ry    =  (e.clientX - cx) / (rect.width  / 2) * MAX;

        card.style.transform =
          `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.02,1.02,1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── Feature panel camera visuals ──────────────────────── */
  function bindFeatureItems() {
    const items    = document.querySelectorAll('.feature-item');
    const panels   = document.querySelectorAll('.feature-panel');
    if (!items.length || !panels.length) return;

    items.forEach((item, idx) => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        item.classList.add('active');
        if (panels[idx]) panels[idx].classList.add('active');
      });
      item.addEventListener('mouseenter', () => {
        items.forEach(i => i.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        item.classList.add('active');
        if (panels[idx]) panels[idx].classList.add('active');
      });
    });

    // activate first
    if (items[0])  items[0].classList.add('active');
    if (panels[0]) panels[0].classList.add('active');
  }

  /* ── Page-hero cursor tilt (inner pages) ────────────────── */
  function bindPageHeroTilt() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;
    const visual = hero.querySelector('.page-hero-visual');
    if (!visual) return;

    let pCurrent = { rx:0, ry:0 };
    let pTarget  = { rx:0, ry:0 };
    let pRaf     = null;

    function pTick() {
      pCurrent.rx += (pTarget.rx - pCurrent.rx) * 0.07;
      pCurrent.ry += (pTarget.ry - pCurrent.ry) * 0.07;
      visual.style.transform =
        `perspective(800px) rotateX(${pCurrent.rx.toFixed(3)}deg) rotateY(${pCurrent.ry.toFixed(3)}deg)`;
      pRaf = requestAnimationFrame(pTick);
    }

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      pTarget.rx = -((e.clientY - cy) / (rect.height / 2)) * 10;
      pTarget.ry =  ((e.clientX - cx) / (rect.width  / 2)) * 14;
    });

    hero.addEventListener('mouseleave', () => {
      pTarget.rx = 0; pTarget.ry = 0;
    });

    pTick();
  }

  /* ── Lens cursor reflection ─────────────────────────────── */
  function bindLensReflection() {
    const lensGlass = document.querySelector('.lens-glass');
    if (!lensGlass) return;

    document.addEventListener('mousemove', e => {
      const rect = lensGlass.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const nx   = (e.clientX - cx) / (rect.width  / 2);
      const ny   = (e.clientY - cy) / (rect.height / 2);
      const angle = Math.atan2(ny, nx) * (180 / Math.PI);

      lensGlass.style.background =
        `radial-gradient(circle at ${50 + nx*20}% ${50 + ny*20}%,
          rgba(255,255,255,0.12) 0%,
          rgba(0,212,255,0.05) 25%,
          rgba(0,0,0,0.75) 100%)`;
    });
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    if (isTouch || isReduced) return;

    camEl   = document.getElementById('camera-3d');
    glowEl  = document.querySelector('.camera-glow');
    flareEl = document.querySelector('.lens-flare');

    hudRings = Array.from(document.querySelectorAll('.hud-ring'));
    parallaxLayers = Array.from(document.querySelectorAll('[data-parallax]'));

    if (camEl) {
      document.addEventListener('mousemove', onMouseMove, { passive: true });
      tick();
    }

    bindCardTilt();
    bindFeatureItems();
    bindPageHeroTilt();
    bindLensReflection();
  }

  /* ── Re-init card tilt (called after dynamic content) ──── */
  function rebindCards() { bindCardTilt(); }

  return { init, rebindCards };
})();
