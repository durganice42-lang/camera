/* ============================================================
   SCROLL.JS — Scroll progress, camera zoom transition,
               aperture animation, section reveal
   ============================================================ */

const ScrollSystem = (() => {
  'use strict';

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Helpers ───────────────────────────────────────────── */
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function lerp(a, b, t)    { return a + (b - a) * t; }
  function norm(v, lo, hi)  { return clamp((v - lo) / (hi - lo), 0, 1); }

  /* ── Scroll Reveal ─────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll(
      '.reveal, .reveal-scale, .reveal-left, .reveal-right'
    );
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // keep observing so it reverses on scroll up
        } else {
          e.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => observer.observe(el));
  }

  /* ── Hero camera zoom (scroll-driven) ──────────────────── */
  function initHeroZoom() {
    const hero  = document.getElementById('hero');
    const camEl = document.getElementById('camera-3d');
    const heroBg = document.querySelector('.hero-bg');
    if (!hero || !camEl) return;

    function update() {
      const scroll  = window.scrollY;
      const heroH   = hero.offsetHeight;
      const progress = clamp(scroll / heroH, 0, 1);

      // Camera scales up and moves slightly forward as user scrolls
      const scale = 1 + progress * 0.6;
      const blur  = progress * 8;
      const ty    = -progress * 60;

      camEl.style.transform =
        `perspective(900px) scale(${scale.toFixed(4)}) translateY(${ty.toFixed(2)}px)`;
      camEl.style.filter = progress > 0.7
        ? `blur(${((progress - 0.7) / 0.3 * blur).toFixed(2)}px)`
        : '';

      // background parallax
      if (heroBg) {
        heroBg.style.transform = `translateY(${(progress * 60).toFixed(2)}px)`;
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Zoom Showcase (sticky scroll) ─────────────────────── */
  function initZoomShowcase() {
    const section  = document.getElementById('zoom-showcase');
    const camEl    = document.getElementById('zoom-showcase-camera');
    const fillEl   = document.querySelector('.zoom-progress-fill');
    const pctLabel = document.querySelector('.zoom-label-pct');
    if (!section || !camEl) return;

    function update() {
      const rect  = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = clamp(scrolled / total, 0, 1);

      const scale    = lerp(0.6, 3.5, progress);
      const opacity  = progress > 0.85 ? lerp(1, 0, (progress - 0.85) / 0.15) : 1;
      const rotateY  = lerp(0, 8, progress > 0.5 ? (progress - 0.5) / 0.5 : 0);
      const blur     = progress > 0.8  ? lerp(0, 12, (progress - 0.8) / 0.2) : 0;

      camEl.style.transform = `scale(${scale.toFixed(4)}) rotateY(${rotateY.toFixed(2)}deg)`;
      camEl.style.opacity   = opacity.toFixed(3);
      if (blur > 0) {
        camEl.style.filter = `blur(${blur.toFixed(2)}px)`;
      } else {
        camEl.style.filter = '';
      }

      if (fillEl)   fillEl.style.width   = (progress * 100).toFixed(1) + '%';
      if (pctLabel) pctLabel.textContent = Math.round(progress * 100) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Lens section scroll zoom ───────────────────────────── */
  function initLensScroll() {
    const section = document.getElementById('lens-section');
    if (!section) return;

    const lensVisual = section.querySelector('.lens-visual');
    if (!lensVisual) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const ratio = e.intersectionRatio;
        const scale  = 0.85 + ratio * 0.2;
        const opacity = 0.4 + ratio * 0.6;
        lensVisual.style.transform = `scale(${scale.toFixed(4)})`;
        lensVisual.style.opacity   = opacity.toFixed(3);
      });
    }, { threshold: Array.from({length: 21}, (_, i) => i / 20) });

    observer.observe(section);
  }

  /* ── Aperture section ───────────────────────────────────── */
  function initAperture() {
    const section = document.getElementById('aperture-section');
    const svg     = document.querySelector('.aperture-svg');
    if (!section || !svg) return;

    const blades  = svg.querySelectorAll('.aperture-blade-path');

    // Build aperture from SVG paths (if generated inline)
    // Here we manipulate the SVG viewBox + blade rotations based on scroll

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          section.dataset.visible = '1';
        } else {
          section.dataset.visible = '0';
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);

    function updateAperture() {
      if (!section.dataset.visible || section.dataset.visible === '0') return;

      const rect     = section.getBoundingClientRect();
      const cy       = window.innerHeight / 2;
      const progress = clamp((cy - rect.top) / rect.height, 0, 1);

      // Opening angle: closed (0) → open (1)
      const open = progress;

      blades.forEach((blade, i) => {
        const baseAngle  = (i / blades.length) * 360;
        const openOffset = open * 30;  // opens 30deg each blade
        blade.style.transform = `rotate(${baseAngle + openOffset}deg)`;
        blade.style.transformOrigin = '250px 250px'; // center of SVG
        blade.style.opacity = 0.4 + open * 0.5;
      });

      // glow intensity
      const glowEl = section.querySelector('.aperture-glow');
      if (glowEl) {
        glowEl.style.opacity = 0.3 + open * 0.7;
        glowEl.style.transform = `scale(${0.8 + open * 0.5})`;
      }
    }

    window.addEventListener('scroll', updateAperture, { passive: true });
  }

  /* ── Parallax story layers ──────────────────────────────── */
  function initParallaxStory() {
    const section = document.getElementById('parallax-story');
    if (!section) return;

    const layers = section.querySelectorAll('.story-layer');

    // speeds: positive = slower than scroll, negative = faster
    const speeds = [-0.4, -0.2, -0.1, 0, 0.1, 0.15, 0.25];

    function updateStory() {
      const rect   = section.getBoundingClientRect();
      const offset = -(rect.top - window.innerHeight / 2);

      layers.forEach((layer, i) => {
        const speed = parseFloat(layer.dataset.speed || speeds[i] || 0);
        const ty    = offset * speed;
        layer.style.transform = `translateY(${ty.toFixed(2)}px)`;
      });
    }

    window.addEventListener('scroll', updateStory, { passive: true });
    updateStory();
  }

  /* ── Intro section parallax ─────────────────────────────── */
  function initIntroParallax() {
    const section = document.getElementById('intro');
    if (!section) return;

    const visual = section.querySelector('.intro-visual');
    const text   = section.querySelector('.intro-text');

    function update() {
      const rect   = section.getBoundingClientRect();
      const mid    = rect.top + rect.height / 2;
      const offset = window.innerHeight / 2 - mid;

      if (visual) visual.style.transform = `translateY(${(offset * -0.12).toFixed(2)}px)`;
      if (text)   text.style.transform   = `translateY(${(offset * -0.06).toFixed(2)}px)`;
    }

    window.addEventListener('scroll', update, { passive: true });
  }

  /* ── Section counter / HUD readout update ───────────────── */
  function initHUDReadout() {
    const readouts = document.querySelectorAll('.hud-readout[data-value]');
    readouts.forEach(el => {
      const target = parseInt(el.dataset.value, 10);
      let current  = 0;

      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          countUp();
          obs.disconnect();
        }
      }, { threshold: 0.5 });

      obs.observe(el);

      function countUp() {
        const start   = performance.now();
        const duration = 1500;
        function step(now) {
          const t = clamp((now - start) / duration, 0, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          current = Math.round(target * ease);
          el.textContent = current + (el.dataset.suffix || '');
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    });
  }

  /* ── Text split reveal ──────────────────────────────────── */
  function initTextSplit() {
    document.querySelectorAll('[data-split]').forEach(el => {
      const text  = el.textContent;
      const chars = [...text];
      el.innerHTML = chars.map((c, i) =>
        `<span class="split-char" style="display:inline-block;opacity:0;transform:translateY(14px);
         transition:opacity .5s ease ${(i * 0.03).toFixed(2)}s,
                    transform .5s cubic-bezier(.22,1,.36,1) ${(i * 0.03).toFixed(2)}s">${c === ' ' ? '&nbsp;' : c}</span>`
      ).join('');

      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          el.querySelectorAll('.split-char').forEach(span => {
            span.style.opacity   = '1';
            span.style.transform = 'translateY(0)';
          });
          obs.disconnect();
        }
      }, { threshold: 0.3 });

      obs.observe(el);
    });
  }

  /* ── Page hero scroll fade ──────────────────────────────── */
  function initPageHeroFade() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;

    const content = hero.querySelector('.page-hero-content');

    function update() {
      const scroll   = window.scrollY;
      const heroH    = hero.offsetHeight;
      const progress = clamp(scroll / (heroH * 0.6), 0, 1);
      if (content) {
        content.style.opacity   = (1 - progress).toFixed(3);
        content.style.transform = `translateY(${progress * -40}px)`;
      }
    }

    window.addEventListener('scroll', update, { passive: true });
  }

  /* ── Footer back-to-top ─────────────────────────────────── */
  function initBackToTop() {
    const btn = document.querySelector('.btn-top');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    if (isReduced) {
      // still init reveal but with no transition
      initReveal();
      initBackToTop();
      return;
    }

    initReveal();
    initHeroZoom();
    initZoomShowcase();
    initLensScroll();
    initAperture();
    initParallaxStory();
    initIntroParallax();
    initHUDReadout();
    initTextSplit();
    initPageHeroFade();
    initBackToTop();
  }

  return { init };
})();
