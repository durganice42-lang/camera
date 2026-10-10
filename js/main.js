/* ============================================================
   MAIN.JS — Bootstrap, header, mobile menu, wiring
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ── Loading screen ─────────────────────────────────────── */
  const loading = document.getElementById('loading-screen');
  if (loading) {
    const minTime   = 2000;
    const startTime = performance.now();
    window.addEventListener('load', () => {
      const elapsed = performance.now() - startTime;
      const wait    = Math.max(0, minTime - elapsed);
      setTimeout(() => loading.classList.add('loaded'), wait);
    });
  }

  /* ── Header scroll behaviour ────────────────────────────── */
  const header = document.getElementById('site-header');
  if (header) {
    const updateHeader = () =>
      header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* ── Active nav link ────────────────────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a, #mobile-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    a.classList.toggle('active', href === path);
  });

  /* ── Mobile menu ────────────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  const mobileClose = mobileNav?.querySelector('.mobile-close');

  function openMobileNav() {
    if (!mobileNav) return;
    hamburger?.classList.add('open');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    mobileNav.querySelectorAll('a').forEach((a, i) => {
      a.style.transitionDelay = `${0.05 + i * 0.06}s`;
    });
  }
  function closeMobileNav() {
    if (!mobileNav) return;
    hamburger?.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    mobileNav.querySelectorAll('a').forEach(a => { a.style.transitionDelay = '0s'; });
  }

  hamburger?.addEventListener('click', () =>
    mobileNav?.classList.contains('open') ? closeMobileNav() : openMobileNav());
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); });

  /* ── Camera SVG markup (shared) ─────────────────────────── */
  const CAMERA_SVG = `
  <svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg" aria-label="Professional mirrorless camera" role="img">
    <defs>
      <radialGradient id="bodyGrad" cx="40%" cy="35%" r="70%">
        <stop offset="0%"   stop-color="#2a3352"/>
        <stop offset="60%"  stop-color="#111827"/>
        <stop offset="100%" stop-color="#070c18"/>
      </radialGradient>
      <radialGradient id="lensGrad" cx="35%" cy="32%" r="65%">
        <stop offset="0%"   stop-color="#1e2d50"/>
        <stop offset="40%"  stop-color="#0a1020"/>
        <stop offset="100%" stop-color="#000408"/>
      </radialGradient>
      <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stop-color="rgba(0,212,255,0.35)"/>
        <stop offset="100%" stop-color="rgba(0,212,255,0)"/>
      </radialGradient>
      <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stop-color="#00d4ff" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.4"/>
      </linearGradient>
      <filter id="camGlow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="shadowF">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <!-- Drop shadow -->
    <ellipse cx="260" cy="362" rx="180" ry="16" fill="rgba(0,0,0,0.55)" filter="url(#shadowF)"/>

    <!-- Body -->
    <rect x="58"  y="118" width="404" height="234" rx="18" fill="url(#bodyGrad)"/>
    <!-- Top ridge -->
    <rect x="78"  y="108" width="364" height="32"  rx="10" fill="#1a2340"/>
    <!-- Viewfinder hump -->
    <rect x="168" y="80"  width="122" height="44"  rx="8"  fill="#111827"/>
    <!-- Hot shoe -->
    <rect x="208" y="74"  width="62"  height="8"   rx="2"  fill="#0d1526"/>
    <!-- Rim glow -->
    <rect x="58"  y="118" width="404" height="234" rx="18" fill="none"
          stroke="url(#rimGrad)" stroke-width="1.5" opacity="0.65"/>

    <!-- Grip -->
    <rect x="418" y="128" width="52"  height="182" rx="14" fill="#141e33"/>
    <rect x="420" y="130" width="48"  height="178" rx="12" fill="none"
          stroke="rgba(0,212,255,0.2)" stroke-width="1"/>
    <!-- Grip ridges -->
    <line x1="426" y1="148" x2="426" y2="297" stroke="rgba(255,255,255,0.045)" stroke-width="2"/>
    <line x1="432" y1="148" x2="432" y2="297" stroke="rgba(255,255,255,0.03)"  stroke-width="2"/>
    <line x1="438" y1="148" x2="438" y2="297" stroke="rgba(255,255,255,0.02)"  stroke-width="2"/>

    <!-- Lens mount collar -->
    <circle cx="234" cy="240" r="107" fill="none"
            stroke="rgba(0,212,255,0.4)" stroke-width="2.5"/>
    <!-- Lens barrel -->
    <circle cx="234" cy="240" r="99"  fill="url(#lensGrad)"/>
    <!-- Lens focus ring -->
    <circle cx="234" cy="240" r="90"  fill="none"
            stroke="rgba(0,212,255,0.2)" stroke-width="1.5"/>
    <!-- Lens zoom ring -->
    <circle cx="234" cy="240" r="74"  fill="none"
            stroke="rgba(0,212,255,0.14)" stroke-width="1"/>
    <!-- Deep inner barrel -->
    <circle cx="234" cy="240" r="62"  fill="#000408"/>
    <!-- Aperture ring -->
    <circle cx="234" cy="240" r="52"  fill="none"
            stroke="rgba(0,212,255,0.24)" stroke-width="1.5"/>
    <!-- Lens glass -->
    <circle cx="234" cy="240" r="45"  fill="url(#lensGlow)" opacity="0.8"/>
    <circle cx="234" cy="240" r="45"  fill="rgba(0,10,30,0.75)"/>
    <!-- Lens center -->
    <circle cx="234" cy="240" r="9"   fill="rgba(0,212,255,0.85)" filter="url(#camGlow)"/>
    <!-- Lens highlight reflection -->
    <ellipse cx="216" cy="220" rx="15" ry="9"
             fill="rgba(255,255,255,0.13)" transform="rotate(-30 216 220)"/>
    <!-- Lens flare spark -->
    <circle cx="252" cy="225" r="3"   fill="rgba(255,255,255,0.18)"/>

    <!-- Shutter button -->
    <circle cx="380" cy="128" r="17"  fill="#0d1526"
            stroke="rgba(0,212,255,0.32)" stroke-width="1"/>
    <circle cx="380" cy="128" r="10"  fill="#050810"/>
    <circle cx="380" cy="128" r="4"   fill="rgba(0,212,255,0.4)"/>

    <!-- Mode dial -->
    <circle cx="340" cy="116" r="19"  fill="#141e33"
            stroke="rgba(0,212,255,0.22)" stroke-width="1"/>
    <line   x1="340" y1="100" x2="340" y2="110"
            stroke="rgba(0,212,255,0.65)" stroke-width="1.5"/>
    <circle cx="340" cy="116" r="4"   fill="rgba(0,212,255,0.3)"/>

    <!-- Function dial -->
    <circle cx="110" cy="126" r="14"  fill="#141e33"
            stroke="rgba(0,212,255,0.18)" stroke-width="1"/>
    <line   x1="110" y1="114" x2="110" y2="120"
            stroke="rgba(0,212,255,0.45)" stroke-width="1.2"/>

    <!-- LCD screen -->
    <rect x="308" y="163" width="114" height="78"  rx="4"
          fill="#040810" stroke="rgba(0,212,255,0.22)" stroke-width="1"/>
    <rect x="312" y="167" width="106" height="70"  rx="2" fill="#030710"/>
    <!-- Screen grid lines -->
    <line x1="318" y1="184" x2="414" y2="184" stroke="rgba(0,212,255,0.14)" stroke-width="0.5"/>
    <line x1="318" y1="202" x2="395" y2="202" stroke="rgba(0,212,255,0.1)"  stroke-width="0.5"/>
    <line x1="318" y1="220" x2="380" y2="220" stroke="rgba(0,212,255,0.07)" stroke-width="0.5"/>
    <!-- Screen readout text -->
    <text x="318" y="181" font-family="monospace" font-size="6.5" fill="rgba(0,212,255,0.55)">1/500   f/1.8</text>
    <text x="318" y="199" font-family="monospace" font-size="6"   fill="rgba(0,212,255,0.42)">ISO 400</text>
    <text x="318" y="217" font-family="monospace" font-size="5.5" fill="rgba(0,212,255,0.28)">RAW+JPEG  ●REC</text>
    <!-- Screen battery indicator -->
    <rect x="390" y="168" width="18" height="9" rx="1"
          fill="none" stroke="rgba(0,212,255,0.3)" stroke-width="0.8"/>
    <rect x="391" y="169" width="12" height="7" rx="0.5"
          fill="rgba(0,212,255,0.4)"/>
    <rect x="408" y="170" width="2"  height="5" rx="0.5"
          fill="rgba(0,212,255,0.3)"/>

    <!-- Lens brand engraving -->
    <text x="234" y="315" text-anchor="middle" font-family="monospace" font-size="7"
          fill="rgba(0,212,255,0.32)" letter-spacing="3">LENSCRAFT  ·  24–70mm  ·  f/1.8</text>

    <!-- Focus distance scale marks -->
    <g stroke="rgba(0,212,255,0.2)" stroke-width="0.8">
      <line x1="175" y1="150" x2="175" y2="158"/>
      <line x1="190" y1="148" x2="190" y2="155"/>
      <line x1="205" y1="147" x2="205" y2="153"/>
      <line x1="220" y1="146" x2="220" y2="152"/>
      <line x1="292" y1="148" x2="292" y2="154"/>
      <line x1="278" y1="149" x2="278" y2="155"/>
    </g>
  </svg>`;

  /* ── Inject camera SVG into all .camera-svg-wrap elements ── */
  function buildAllCameraSVGs() {
    document.querySelectorAll('.camera-svg-wrap').forEach(wrap => {
      if (!wrap.querySelector('svg')) {
        wrap.innerHTML = CAMERA_SVG;
      }
    });
  }

  /* ── Clone hero camera into zoom-showcase ───────────────── */
  function cloneZoomShowcaseCamera() {
    const zoomWrap = document.querySelector('#zoom-showcase-camera .camera-svg-wrap');
    if (!zoomWrap) return;
    if (zoomWrap.querySelector('svg')) return; // already populated

    // Build directly — same SVG
    zoomWrap.innerHTML = CAMERA_SVG;
  }

  /* ── Aperture SVG builder ───────────────────────────────── */
  function buildApertureSVGs() {
    document.querySelectorAll('.aperture-svg').forEach(container => {
      if (container.querySelector('svg')) return; // already built

      const BLADE_COUNT = 8;
      const CX = 250, CY = 250, R = 200;

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 500 500');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('aria-label', 'Camera aperture');
      svg.setAttribute('role', 'img');
      svg.style.cssText = 'width:100%;height:100%;display:block;';

      // defs
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.innerHTML = `
        <radialGradient id="apGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stop-color="rgba(0,212,255,0.5)"/>
          <stop offset="100%" stop-color="rgba(0,212,255,0)"/>
        </radialGradient>
        <filter id="apGlowF" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="apBlur">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>`;
      svg.appendChild(defs);

      // background
      const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bg.setAttribute('cx', CX); bg.setAttribute('cy', CY);
      bg.setAttribute('r', R + 30);
      bg.setAttribute('fill', 'rgba(5,8,16,0.6)');
      svg.appendChild(bg);

      // outer rings
      [R + 20, R + 10, R].forEach((r, i) => {
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('cx', CX); ring.setAttribute('cy', CY); ring.setAttribute('r', r);
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', `rgba(0,212,255,${0.35 - i * 0.08})`);
        ring.setAttribute('stroke-width', i === 0 ? '2' : '1');
        svg.appendChild(ring);
      });

      // tick marks on outer ring
      for (let t = 0; t < 36; t++) {
        const isLong   = t % 9 === 0;
        const isMid    = t % 3 === 0 && !isLong;
        const angle    = (t / 36) * Math.PI * 2 - Math.PI / 2;
        const rOuter   = R + 20;
        const rInner   = rOuter - (isLong ? 16 : isMid ? 10 : 6);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', CX + Math.cos(angle) * rOuter);
        line.setAttribute('y1', CY + Math.sin(angle) * rOuter);
        line.setAttribute('x2', CX + Math.cos(angle) * rInner);
        line.setAttribute('y2', CY + Math.sin(angle) * rInner);
        line.setAttribute('stroke', `rgba(0,212,255,${isLong ? 0.6 : 0.25})`);
        line.setAttribute('stroke-width', isLong ? '2' : '1');
        line.setAttribute('stroke-linecap', 'round');
        svg.appendChild(line);
      }

      // aperture blades
      for (let i = 0; i < BLADE_COUNT; i++) {
        const angle = (i / BLADE_COUNT) * 360;
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `rotate(${angle} ${CX} ${CY})`);

        const blade = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        blade.setAttribute('d', `M ${CX} ${CY - 16} Q ${CX + 72} ${CY - 92} ${CX} ${CY - 198} Q ${CX - 72} ${CY - 92} ${CX} ${CY - 16} Z`);
        blade.setAttribute('fill', 'rgba(8,12,28,0.92)');
        blade.setAttribute('stroke', 'rgba(0,212,255,0.25)');
        blade.setAttribute('stroke-width', '0.8');
        blade.classList.add('aperture-blade-path');
        g.appendChild(blade);
        svg.appendChild(g);
      }

      // inner aperture hole (dark circle = opening)
      const hole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      hole.setAttribute('cx', CX); hole.setAttribute('cy', CY);
      hole.setAttribute('r', '78');
      hole.setAttribute('fill', '#020408');
      svg.appendChild(hole);

      // inner glow ring
      const iglow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      iglow.setAttribute('cx', CX); iglow.setAttribute('cy', CY);
      iglow.setAttribute('r', '78');
      iglow.setAttribute('fill', 'none');
      iglow.setAttribute('stroke', 'rgba(0,212,255,0.4)');
      iglow.setAttribute('stroke-width', '1.5');
      svg.appendChild(iglow);

      // center glow
      const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      center.setAttribute('cx', CX); center.setAttribute('cy', CY);
      center.setAttribute('r', '20');
      center.setAttribute('fill', 'url(#apGlow)');
      svg.appendChild(center);

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', CX); dot.setAttribute('cy', CY);
      dot.setAttribute('r', '6');
      dot.setAttribute('fill', 'rgba(0,212,255,0.9)');
      dot.setAttribute('filter', 'url(#apGlowF)');
      svg.appendChild(dot);

      container.parentNode.replaceChild(svg, container);
    });
  }

  /* ── Lens tick marks ─────────────────────────────────────── */
  function enhanceLensSection() {
    document.querySelectorAll('#lens-section .lens-outer, .lens-visual .lens-outer').forEach(outer => {
      if (outer.querySelector('.lens-tick')) return;
      const radius = outer.offsetWidth / 2 || 200;
      for (let i = 0; i < 24; i++) {
        const tick    = document.createElement('span');
        tick.className = 'lens-tick';
        const angle   = (i / 24) * 360;
        const isLong  = i % 6 === 0;
        tick.style.cssText = `
          position:absolute;left:50%;top:0;
          width:${isLong ? '2px' : '1px'};
          height:${isLong ? '14px' : '8px'};
          background:rgba(0,212,255,${isLong ? '0.55' : '0.22'});
          transform-origin:50% ${radius}px;
          transform:translateX(-50%) rotate(${angle}deg);
          border-radius:1px;`;
        outer.appendChild(tick);
      }
    });
  }

  /* ── HUD data readout live counter ─────────────────────── */
  function animateHUDValues() {
    // Animate any [data-hud-count] elements when visible
    document.querySelectorAll('[data-hud-count]').forEach(el => {
      const target = parseFloat(el.dataset.hudCount);
      const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        let start = null;
        const dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          const t = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          const val  = (target * ease).toFixed(el.dataset.decimals || 0);
          el.textContent = val + (el.dataset.suffix || '');
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }, { threshold: 0.6 });
      obs.observe(el);
    });
  }

  /* ── Page transitions ────────────────────────────────────── */
  function initPageTransitions() {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto') ||
          href.startsWith('tel') || a.target === '_blank') return;
      a.addEventListener('click', e => {
        e.preventDefault();
        document.body.style.opacity    = '0';
        document.body.style.transition = 'opacity .3s';
        setTimeout(() => { window.location.href = href; }, 300);
      });
    });
    // Fade in
    document.body.style.opacity    = '0';
    document.body.style.transition = 'opacity .5s';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    }));
  }

  /* ── Newsletter form ─────────────────────────────────────── */
  function initNewsletterForms() {
    document.querySelectorAll('.footer-newsletter').forEach(form => {
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('.btn-cta');
      if (!btn) return;
      btn.addEventListener('click', e => {
        e.preventDefault();
        if (input && input.value.includes('@')) {
          const span = btn.querySelector('span');
          if (span) span.textContent = 'SUBSCRIBED ✓';
          btn.style.borderColor = '#22c55e';
          btn.style.color       = '#22c55e';
          input.value = '';
          setTimeout(() => {
            if (span) span.textContent = 'SUBSCRIBE';
            btn.style.borderColor = '';
            btn.style.color       = '';
          }, 3000);
        }
      });
    });
  }

  /* ── Contact form ─────────────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (!btn) return;
      const span    = btn.querySelector('span');
      const original = span?.textContent || btn.textContent;
      if (span) span.textContent = 'SENDING...';
      setTimeout(() => {
        if (span) span.textContent = 'MESSAGE SENT ✓';
        btn.style.borderColor = '#22c55e';
        btn.style.color       = '#22c55e';
        setTimeout(() => {
          if (span) span.textContent = original;
          btn.style.borderColor = '';
          btn.style.color       = '';
          form.reset();
        }, 3000);
      }, 1200);
    });
  }

  /* ── Boot sequence ──────────────────────────────────────── */

  // 1. Build all camera SVGs (hero + zoom-showcase + inner pages)
  buildAllCameraSVGs();

  // 2. After hero SVG is ready, clone into zoom-showcase
  cloneZoomShowcaseCamera();

  // 3. Build aperture SVG(s)
  buildApertureSVGs();

  // 4. Lens section tick marks
  enhanceLensSection();

  // 5. Gallery scene illustrations — must run before GallerySystem.init()
  if (typeof GalleryImages !== 'undefined') {
    GalleryImages.init();
  }

  // 6. Page transitions + forms
  initPageTransitions();
  initNewsletterForms();
  initContactForm();
  animateHUDValues();

  // 7. Initialize all subsystems
  if (typeof ParticleSystem !== 'undefined') ParticleSystem.init();
  if (typeof CursorSystem   !== 'undefined') CursorSystem.init();
  if (typeof Camera3D       !== 'undefined') Camera3D.init();
  if (typeof ScrollSystem   !== 'undefined') ScrollSystem.init();
  if (typeof GallerySystem  !== 'undefined') GallerySystem.init();

  // 8. Rebind cursor after dynamic DOM settled
  setTimeout(() => {
    if (typeof CursorSystem !== 'undefined') CursorSystem.rebind();
    if (typeof Camera3D     !== 'undefined') Camera3D.rebindCards();
  }, 400);
});
