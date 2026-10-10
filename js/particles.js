/* ============================================================
   PARTICLES.JS — Canvas particle system with depth layers
   ============================================================ */

const ParticleSystem = (() => {
  'use strict';

  /* ── Config ────────────────────────────────────────────── */
  const CONFIG = {
    count        : 90,
    mouse        : { influence: 80, strength: 0.022 },
    layers       : [
      { depth: 0.2, count: 20, size: [1, 2],   speed: [0.15, 0.3],  alpha: [0.1, 0.25], color: 'rgba(0,212,255,' },
      { depth: 0.5, count: 40, size: [1.5, 3], speed: [0.2,  0.5],  alpha: [0.2, 0.5],  color: 'rgba(0,212,255,' },
      { depth: 1.0, count: 30, size: [2, 4.5], speed: [0.3,  0.7],  alpha: [0.3, 0.7],  color: 'rgba(124,58,237,' },
    ],
    reducedCount : 30,
  };

  /* ── State ─────────────────────────────────────────────── */
  let canvas, ctx, particles = [], raf = null;
  let W, H;
  let mouse = { x: -9999, y: -9999 };
  let isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Particle class ────────────────────────────────────── */
  class Particle {
    constructor(layer) {
      this.layer = layer;
      this.reset(true);
    }

    reset(initial = false) {
      this.x    = Math.random() * W;
      this.y    = initial ? Math.random() * H : H + 10;
      this.size = rand(this.layer.size[0], this.layer.size[1]);
      this.vx   = (Math.random() - 0.5) * this.layer.speed[1] * 0.4;
      this.vy   = -(rand(this.layer.speed[0], this.layer.speed[1]));
      this.baseAlpha = rand(this.layer.alpha[0], this.layer.alpha[1]);
      this.alpha = 0;
      this.fadeIn  = true;
      this.life    = 0;
      this.maxLife = rand(180, 420);
      this.color   = this.layer.color;
      this.depth   = this.layer.depth;
      // wobble
      this.wobbleFreq  = rand(0.005, 0.02);
      this.wobbleAmp   = rand(0.3, 1.2);
      this.wobblePhase = Math.random() * Math.PI * 2;
    }

    update(frame) {
      this.life++;

      // fade in/out
      if (this.life < 30) {
        this.alpha = (this.life / 30) * this.baseAlpha;
      } else if (this.life > this.maxLife - 30) {
        this.alpha = ((this.maxLife - this.life) / 30) * this.baseAlpha;
      } else {
        this.alpha = this.baseAlpha;
      }

      // wobble horizontal
      this.x += this.vx + Math.sin(frame * this.wobbleFreq + this.wobblePhase) * this.wobbleAmp;
      this.y += this.vy;

      // mouse repulsion
      const dx  = this.x - mouse.x;
      const dy  = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouse.influence) {
        const force = (1 - dist / CONFIG.mouse.influence) * CONFIG.mouse.strength * this.depth;
        this.x += dx * force;
        this.y += dy * force;
      }

      if (this.life >= this.maxLife || this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.fillStyle   = this.color + this.alpha + ')';
      ctx.shadowBlur  = this.size * 3;
      ctx.shadowColor = this.color + '0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ── Helpers ───────────────────────────────────────────── */
  function rand(min, max) { return min + Math.random() * (max - min); }

  /* ── Setup ─────────────────────────────────────────────── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function buildParticles() {
    particles = [];
    CONFIG.layers.forEach(layer => {
      const n = isReduced ? Math.floor(layer.count * 0.3) : layer.count;
      for (let i = 0; i < n; i++) {
        particles.push(new Particle(layer));
      }
    });
  }

  /* ── Render loop ───────────────────────────────────────── */
  let frame = 0;

  function render() {
    ctx.clearRect(0, 0, W, H);
    ctx.shadowBlur = 0;

    particles.forEach(p => {
      p.update(frame);
      p.draw();
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur  = 0;
    frame++;
    raf = requestAnimationFrame(render);
  }

  /* ── Mouse tracking ────────────────────────────────────── */
  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    buildParticles();

    window.addEventListener('resize', () => { resize(); buildParticles(); }, { passive: true });
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    render();
  }

  /* ── Pause / Resume (used by page visibility) ──────────── */
  function pause() { cancelAnimationFrame(raf); raf = null; }
  function resume() { if (!raf) render(); }

  document.addEventListener('visibilitychange', () => {
    document.hidden ? pause() : resume();
  });

  return { init, pause, resume };
})();
